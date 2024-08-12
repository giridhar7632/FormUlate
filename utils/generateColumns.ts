import { Column, FormField } from "@/types/types";

// const typeMap: { [key: string]: string } = {
//   input: 'string',
//   text: 'string',
//   textarea: 'text',
//   select: 'string',
//   checkbox: 'string',
//   radio: 'string',
//   email: 'email',
//   number: 'int',
//   dropdown: 'string',
// }

// const typeMap: { [key: string]: string } = {
//   // Textual input types
//   text: 'string',
//   password: 'string',
//   email: 'email',
//   url: 'url',
//   tel: 'tel',
//   search: 'string',

//   // Numerical input types
//   number: 'int',
//   range: 'int',
//   date: 'date',
//   month: 'date',
//   week: 'date',
//   time: 'time',
//   datetime-local: 'datetime-local',

//   // Other input types
//   checkbox: 'boolean',
//   radio: 'string',
//   file: 'file',

//   // Text areas
//   textarea: 'text',

//   // Select elements
//   select: 'string',

//   // Button elements
//   button: 'void',
//   submit: 'void',
//   reset: 'void',

//   // Other form elements
//   form: 'void',
//   label: 'void',
//   fieldset: 'void',
//   legend: 'void',
//   output: 'string',
//   option: 'string',
//   optgroup: 'string',
// };

const typeMap: {
  [key: string]: string | ((elem: HTMLInputElement) => string);
} = {
  // Textual inputs
  text: "string",
  password: "string",
  search: "string",
  tel: "string",
  url: "string",

  // Larger text inputs
  textarea: "text",

  // Single-line text inputs with specific validation
  email: "email",
  number: "int",
  date: "datetime",
  month: "datetime",
  week: "datetime",
  time: "datetime",
  datetime: "datetime",
  "datetime-local": "datetime",

  // Numeric inputs
  range: "int",

  // Selection-based inputs
  select: "string", // Assuming single-select
  multiselect: "multiple", // Assuming multi-select element

  // Boolean inputs
  checkbox: "boolean",
  radio: "string", // Value depends on selected option

  // File inputs
  file: "file",

  // Custom elements (not standard HTML, but common in frameworks)
  dropdown: "string",

  // Specific handling for non-standard elements
  input: (elem: HTMLInputElement) => {
    switch (elem.type) {
      case "button":
      case "submit":
      case "reset":
      case "image":
        return "string";
      case "hidden":
        return "string"; // Assuming string value
      default:
        return "string"; // Fallback for unknown types
    }
  },
};

export function generateColumns(fields: FormField[]): Column[] {
  const cols: Column[] = [];
  fields.forEach((field) => {
    field.type !== "submit" &&
      cols.push({
        name: field.name,
        type: typeMap[
          field?.type || (field?.field as string)
        ] as Column["type"],
      });
  });
  return cols;
}
