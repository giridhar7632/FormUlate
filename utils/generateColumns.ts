import { Column, FormField } from '@/types/types'

const typeMap: { [key: string]: string } = {
  input: 'string',
  text: 'string',
  textarea: 'text',
  select: 'string',
  checkbox: 'bool',
  radio: 'string',
  email: 'email',
  number: 'int',
}

export function generateColumns(fields: FormField[]): Column[] {
  const cols: Column[] = []
  fields.forEach((field) => {
    field.type !== 'submit' &&
      cols.push({
        name: field.name,
        type: typeMap[
          field?.type || (field?.field as string)
        ] as Column['type'],
      })
  })
  return cols
}
