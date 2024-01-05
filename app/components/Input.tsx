import { FormField } from '@/lib/types'
import clsx from 'clsx'

const Input: React.FC<FormField> = ({ name, field, type, disabled, label }) => {
	return (
		<div className={'h-12 mb-2'}>
            {field && type != "checkbox" ? <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-600">
				{label}
			</label> : null}
			<input
				className={clsx([
					'h-lg form-control block h-full w-full bg-gray-100 bg-clip-padding px-4 py-2 font-normal text-gray-700 focus:border focus:ring-2',
					'm-0 rounded-xl transition ease-in-out focus:border-blue-500 focus:text-gray-700 focus:outline-none focus:ring-blue-100',
					disabled && 'cursor-not-allowed opacity-70',
				])}
				type={type}
				name={name}
				id={name}
				placeholder={label}
				disabled={disabled}
			/>
            {type == "checkbox" ? <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-600">
				{label}
			</label> : null}
		</div>
	)
}

export default Input