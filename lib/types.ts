export type FormData = {
  form: string
  created_by: {
    name: string
    profile: string
  }
  fields: FormField[]
}

export type FormField = {
  id?: string
  field?: string
  type: string
  name: string
  label: string
  value?: string
  placeholder?: string
  disabled?: boolean
  options?: {
    value: string
    label: string
    name?: string
  }[]
}

export type SetTableSchema = {
  columns: Column[]
}

export type Column = {
  name: string
  type:
    | 'bool'
    | 'int'
    | 'float'
    | 'string'
    | 'text'
    | 'email'
    | 'multiple'
    | 'link'
    | 'object'
    | 'datetime'
    | 'vector'
    | 'file[]'
    | 'file'
    | 'json'
  link?: ColumnLink
  vector?: ColumnVector
  file?: ColumnFile
  ['file[]']?: ColumnFile
  notNull?: boolean
  defaultValue?: string
  unique?: boolean
  columns?: Column[]
}

type ColumnLink = {
  table: string
}

type ColumnVector = {
  /**
   * @maximum 10000
   * @minimum 2
   */
  dimension: number
}

type ColumnFile = {
  defaultPublicAccess?: boolean
}
