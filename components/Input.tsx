import { FormField } from '@/types/types'
import clsx from 'clsx'

const Input: React.FC<FormField> = ({
  name,
  field,
  type,
  disabled,
  label,
  required,
  placeholder,
}) => {
  return (
    <div className={'min-h-12 mb-3'}>
      {field && type != 'checkbox' ? (
        <label htmlFor={name} className="mb-1 block text-sm text-gray-500">
          {label} {required ? <span className="text-red-500">*</span> : null}
        </label>
      ) : null}
      <input
        className={clsx([
          'bg-gray-100 bg-clip-padding px-4 py-2 font-normal text-gray-700 focus:border focus:ring-2',
          'm-0 rounded-xl transition ease-in-out focus:border-blue-500 focus:text-gray-700 focus:outline-none focus:ring-blue-100',
          disabled && 'cursor-not-allowed opacity-70',
          type == 'checkbox' ? 'inline mr-2' : 'block h-full w-full',
        ])}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
      />
      {type == 'checkbox' ? (
        <label htmlFor={name} className="mb-1 text-sm text-gray-600">
          {label}
        </label>
      ) : null}
    </div>
  )
}

export default Input
