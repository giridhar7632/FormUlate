import clsx from 'clsx'

type ButtonProps = {
    variant?: 'primary' | 'secondary' | 'danger' | 'text' | 'gray' | 'outline'
    loading?: boolean
    loadingText?: string
    className?: string
    disabled?: boolean
    onClick?: () => void
    children: React.ReactNode
    type?: 'button' | 'submit' | 'reset'
}

type IconButtonProps = {
    children: React.ReactNode
    onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    loading = false,
    loadingText = 'Loading...',
    className,
    children,
    disabled,
    onClick,
    type = 'button',
    ...props
}) => {
    const variantClassname = clsx({
        ['bg-blue-500 ring-blue-200 dark:ring-blue-400 hover:bg-blue-600 text-white disabled:bg-blue-500 disabled:ring-0']:
            variant === 'primary',
        ['bg-blue-100 dark:bg-blue-100 ring-0 text-blue-500 hover:text-blue-600 disabled:bg-blue-100 disabled:ring-0']:
            variant === 'secondary',
        ['text-blue-500 hover:text-blue-600 hover:ring-0 disabled:text-blue-300 bg-white bg-opacity-10 backdrop-blur-sm']:
            variant === 'text',
        ['bg-gray-100 hover:ring-gray-200 hover:bg-gray-200 text-gray-500 disabled:bg-gray-300 disabled:ring-0']:
            variant === 'gray',
        ['hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-900 dark:text-gray-200 hover:ring-gray-200 dark:hover:ring-gray-700 border-2 border-gray-200 dark:border-gray-600 disabled:bg-gray-300 disabled:ring-0']:
            variant === 'outline',
        ['bg-red-500 ring-red-200 dark:ring-red-400 hover:bg-red-600 text-white disabled:bg-red-500 disabled:ring-0']:
            variant === 'danger',
    })

    return (
        <button
            className={clsx(
                variantClassname,
                'h-lg flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 leading-snug transition duration-150 ease-in-out hover:ring focus:ring disabled:bg-gray-200 disabled:text-gray-600 disabled:cursor-not-allowed',
                className,
            )}
            disabled={disabled || loading}
            onClick={onClick}
            type={type}
            {...props}
        >
            {loading ? loadingText : children}
        </button>
    )
}

export default Button

export const IconButton: React.FC<IconButtonProps> = ({ children, ...props }) => {
    return (
        <button
            className="flex items-center justify-center rounded-full bg-blue-100 p-2 text-blue-500 ring-0 hover:text-blue-600 hover:ring hover:ring-blue-200 disabled:bg-blue-100 disabled:ring-0"
            {...props}
        >
            {children}
        </button>
    )
}
