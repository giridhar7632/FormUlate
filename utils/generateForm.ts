import { createElement } from 'react'
import { FormField } from '../types/types'

function generateFormComponent(fields: FormField[], disabled: Boolean) {
  const fieldComponents = fields.map((field: FormField, idx) => {
    if (field.field === 'select') {
      return createElement(
        'select',
        { key: idx, name: field.name, id: field.name },
        field?.options &&
          field?.options.map((option) =>
            createElement(
              'option',
              { key: option.value, value: option.value, disabled },
              option.label
            )
          )
      )
    } else if (field.field === 'textarea') {
      return createElement(
        'textarea',
        {
          key: idx,
          type: field.type,
          name: field.name,
          value: field.value,
          disabled,
        },
        field.label
      )
    } else if (field.field === 'button') {
      return createElement(
        'button',
        {
          key: idx,
          type: field.type,
          name: field.name,
          value: field.value,
          disabled,
        },
        field.label
      )
    } else {
      return createElement('input', {
        key: idx,
        type: field.type,
        name: field.name,
        id: field.name,
        placeholder: field.placeholder,
        disabled,
      })
    }
  })

  return fieldComponents
}

export default generateFormComponent
