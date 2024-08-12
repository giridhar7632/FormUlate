export type PageData = {
  title: string;
  action: string;
  fields: FormField[];
};

export type FormField = {
  id?: string;
  field?: string;
  type: string;
  name: string;
  label: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  options?: {
    value: string;
    label: string;
    name?: string;
  }[];
};

export type SetTableSchema = {
  columns: Column[];
};

export type Column = {
  name: string;
  type:
    | "bool"
    | "int"
    | "float"
    | "string"
    | "text"
    | "email"
    | "multiple"
    | "link"
    | "object"
    | "datetime"
    | "vector"
    | "file[]"
    | "file"
    | "json";
  link?: ColumnLink;
  vector?: ColumnVector;
  file?: ColumnFile;
  ["file[]"]?: ColumnFile;
  notNull?: boolean;
  defaultValue?: string;
  unique?: boolean;
  columns?: Column[];
};

type ColumnLink = {
  table: string;
};

type ColumnVector = {
  /**
   * @maximum 10000
   * @minimum 2
   */
  dimension: number;
};

type ColumnFile = {
  defaultPublicAccess?: boolean;
};

export type IconTypes = {
  tag: string;
  attr: {
    viewBox: string;
    fill: string;
    stroke: string;
    strokeWidth: string;
    strokeLinecap: string;
    strokeLinejoin: string;
  };
  child: {
    tag: string;
    attr: {
      points?: string;
      d?: string;
      stroke?: string;
      x1?: string;
      y1?: string;
      x2?: string;
      y2?: string;
    };
  }[];
};

export type IconPropsType = {
  [key: string]: any;
};
