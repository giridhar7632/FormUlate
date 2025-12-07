import { GoogleGenAI, Type } from "@google/genai";
import { z } from "zod";

const formOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  name: z.string().nullable().optional(),
});

const formFieldSchema = z.object({
  id: z.string().nullable().optional(),

  field: z.string().describe("HTML element (e.g., input, select, textarea)"),
  fieldType: z.string().describe("Input type (e.g., text, email, number)").optional(),
  name: z.string(),
  label: z.string(),

  // value: z.string().nullable().optional(),
  placeholder: z.string().nullable().optional(),
  disabled: z.boolean().nullable().optional(),

  required: z.boolean().nullable().optional(),

  options: z.array(formOptionSchema).nullable().optional(),
});

export const generatedFormSchema = z.object({
  title: z.string().describe("Title of the form"),
  action: z
    .enum(["create", "update"])
    .describe("The action intent: create, update, or delete"),
  fields: z.array(formFieldSchema).describe("List of form fields"),
});

export async function model(old: Object, input: string) {
  const ai = new GoogleGenAI({});

  const prompt = `
    Task: Generate a JSON configuration for a form based on the user's description.
    
    User Description: "${input}"

    Requirements:
    - Determine the 'action' (create, update) based on the user's intent.
    - Generate appropriate fields (input, textarea, select, etc.).
    - Ensure 'name' attributes are snake_case.
    - Do not include a submit button in the fields array.
  `;

  try {
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL ?? 'gemini-2.5-flash', 
      contents: prompt,
      config: {
          responseMimeType: "application/json",
          responseSchema: {
                type: Type.OBJECT,
                required: ["title", "action", "fields"],
                properties: {
                  title: {
                    type: Type.STRING,
                    description: "Title of the form",
                  },
                  action: {
                    type: Type.STRING,
                    description: "The action intent: create, update, or delete",
                    enum: ["create", "update"],
                  },
                  fields: {
                    type: Type.ARRAY,
                    description: "List of form fields",
                    items: {
                      type: Type.OBJECT,
                      required: ["field", "name", "label"],
                      properties: {
                        id: {
                          type: Type.STRING,
                        },
                        field: {
                          type: Type.STRING,
                          description: "HTML element (e.g., input, select, textarea)",
                        },
                        fieldType: {
                          type: Type.STRING,
                          description: "Input type (e.g., text, email, number)",
                        },
                        name: {
                          type: Type.STRING,
                        },
                        label: {
                          type: Type.STRING,
                        },
                        // value: {
                        //   type: Type.STRING,
                        // },
                        placeholder: {
                          type: Type.STRING,
                        },
                        disabled: {
                          type: Type.BOOLEAN,
                        },
                        required: {
                          type: Type.BOOLEAN,
                        },
                        options: {
                          type: Type.ARRAY,
                          items: {
                            type: Type.OBJECT,
                            required: ["value", "label"],
                            properties: {
                              value: {
                                type: Type.STRING,
                              },
                              label: {
                                type: Type.STRING,
                              },
                              name: {
                                type: Type.STRING,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              systemInstruction: [
                  {
                    text: `You are a UI generator helper that generates HTML form fields by understanding the user prompt`,
                  }
              ],
        }
    });
    console.log(response.text)
    const responseText = generatedFormSchema.parse(JSON.parse(response.text ?? ''));

    console.log({ responseText });

    // Returns a valid JSON string
    return responseText;
  } catch (error) {
    console.error("Error generating form schema:", error);
    throw new Error("Failed to generate form JSON");
  }
}