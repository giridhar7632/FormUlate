const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require('@google/generative-ai')

const MODEL_NAME = 'gemini-pro'
const API_KEY = process.env.GEMINI_API_KEY

export async function model(old: Object, input: string) {
  const genAI = new GoogleGenerativeAI(API_KEY)
  const model = genAI.getGenerativeModel({ model: MODEL_NAME })

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 0.9,
    maxOutputTokens: 5000,
  }

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ]

  const parts = [
    {
      text: `understand and generate a parsable json file in the format given (do not include submit button, comments in json) from the given description:\nformat:\nexport type FormData = {\n title: string\n action: 'create' | 'update' | 'delete' // understand what user wanted to do\n fields: FormField[]\n}\n\nexport type FormField = {\n id?: string\n field: string // html element\n type: string // type of form element\n name: string\n label: string\n value?: string\n placeholder?: string\n disabled?: boolean\n required?: boolean\n options?: {\n  value: string\n  label: string\n  name?: string\n }[]\n}\n\ndescription: "${input}" \n\nold: "${JSON.stringify(
        old
      )}"`,
    },
  ]

  const result = await model.generateContent({
    contents: [{ role: 'user', parts }],
    generationConfig,
    safetySettings,
  })

  const response = result.response
  return response.text()
}
