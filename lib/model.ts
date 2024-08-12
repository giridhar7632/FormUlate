import { GoogleGenerativeAI } from "@google/generative-ai";

export async function model(old: Object, input: string) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `understand and generate a parsable json file in the format given (do not include submit button) from the given description:\nformat:\nexport type FormData = {\n title: string\n action: 'create' | 'update' | 'delete' // understand what user wanted to do\n fields: FormField[]\n}\n\nexport type FormField = {\n id?: string\n field: string // html element\n type: string // type of form element\n name: string\n label: string\n value?: string\n placeholder?: string\n disabled?: boolean\n required?: boolean\n options?: {\n value: string\n label: string\n name?: string\n }[]\n}\n\ndescription: "${input}" \n comeup with title, description and atleast one field \n\nold: "${JSON.stringify(
    old
  )}"`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const responseText = response.text();
  console.log({ responseText });

  return responseText;
}
