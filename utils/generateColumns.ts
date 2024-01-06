import { Column, FormField } from "@/lib/types";

const typeMap: { [key: string]: string } = {
        "text": "string",
        "textarea": "text",
        "select": "string",
        "checkbox": "bool",
        "radio": "string",
        "email": "email",
}

export function generateColumns(fields: FormField[]): Column[] {
        return fields.map(field => ({
            name: field.name,
            type: typeMap[field.type] as Column['type'],
        }));
}
