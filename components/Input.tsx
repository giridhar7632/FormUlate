import clsx from 'clsx'

type InputProps = {
    name: string
    field?: string
    type: string
    disabled?: boolean
    label?: string
    required?: boolean
    placeholder?: string
    value?: string
    className?: string
    onChange?: (e: any) => void
}

const Input = ({ name, field, type, disabled, label, required, placeholder, className, ...props }: InputProps) => {
    return (
        <div className={`min-h-12 mb-3 ${className}`}>
            {field && type != 'checkbox' ? (
                <label htmlFor={name} className="mb-1 block text-sm text-gray-500">
                    {label} {required ? <span className="text-red-500">*</span> : null}
                </label>
            ) : null}
            <input
                className={clsx([
                    'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border dark:border-gray-600 bg-clip-padding px-4 py-2 font-normal text-gray-700 focus:border focus:ring-2',
                    'm-0 rounded-xl transition ease-in-out focus:border-blue-500 dark:text-gray-100 focus:outline-none focus:ring-blue-100 dark:focus:ring-blue-400',
                    disabled && 'cursor-not-allowed opacity-70',
                    type == 'checkbox' ? 'inline mr-2' : 'block h-full w-full',
                ])}
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                {...props}
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
