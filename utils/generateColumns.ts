import { Column, FormField } from '@/lib/types'

const typeMap: { [key: string]: string } = {
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
        type: typeMap[field.type] as Column['type'],
      })
  })
  return cols
}
