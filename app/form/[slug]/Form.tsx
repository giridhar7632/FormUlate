'use client'

import { useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { FormField } from '@/types/types'
import clsx from 'clsx'
import Input from '@/components/Input'
import Button from '@/components/Button'

type FormProps = {
  fields: FormField[]
}

const Form: React.FC<FormProps> = ({ fields }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [consent, setConsent] = useState(false)
  const { pending } = useFormStatus()
  return (
    <form
      className="flex flex-col"
      ref={formRef}
      action={async (formData) => {
        for (let pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1])
        }
        formRef.current?.reset()
      }}
    >
      {fields
        ? fields.map((i: FormField, idx) => {
            const { field, ...attr } = i
            if (field === 'select') {
              return (
                <div className="min-h-12 mb-3" key={idx}>
                  <label
                    htmlFor={attr.name}
                    className="mb-1 block text-sm text-gray-500"
                  >
                    {attr.label}
                  </label>
                  <select disabled={pending} key={idx} name={attr.name}>
                    {attr?.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )
            } else if (field === 'textarea') {
              return (
                <div className="min-h-12 mb-3" key={idx}>
                  <label
                    htmlFor={attr.name}
                    className="mb-1 block text-sm text-gray-500"
                  >
                    {attr.label}
                  </label>
                  <textarea
                    className={clsx([
                      'h-xl block w-full bg-gray-100 bg-clip-padding px-4 py-2 font-normal text-gray-700 focus:border focus:ring-2',
                      'm-0 rounded-xl transition ease-in-out focus:border-blue-500 focus:text-gray-700 focus:outline-none focus:ring-blue-100',
                      pending && 'cursor-not-allowed opacity-70',
                    ])}
                    disabled={pending}
                    {...attr}
                  />
                </div>
              )
            }
            if (field === 'checkbox') {
              return (
                <fieldset className="min-h-12 mb-3" name={attr.name} key={idx}>
                  <legend className="mb-1 block text-sm  text-gray-500">
                    {attr.label}
                  </legend>
                  {attr?.options?.map((option) => (
                    <div key={option.value + idx}>
                      <input
                        key={option.value + idx}
                        type="checkbox"
                        name={attr.name}
                        value={option.value}
                        id={`${attr.name}-${option.value}`}
                        className="inline mr-2"
                      />
                      <label htmlFor={`${attr.name}-${option.value}`}>
                        {option.label}
                      </label>
                    </div>
                  ))}
                </fieldset>
              )
            } else if (field === 'radio') {
              return (
                <fieldset className="min-h-12 mb-3" name={attr.name} key={idx}>
                  <legend className="mb-1 block text-sm  text-gray-500">
                    {attr.label}
                  </legend>
                  {attr?.options?.map((option) => (
                    <div key={option.value + idx}>
                      <input
                        type="radio"
                        name={attr.name}
                        value={option.value}
                        id={`${attr.name}-${option.value}`}
                        className="inline mr-2"
                      />
                      <label htmlFor={`${attr.name}-${option.value}`}>
                        {option.label}
                      </label>
                    </div>
                  ))}
                </fieldset>
              )
            } else {
              return (
                <Input key={idx} disabled={pending} field={field} {...attr} />
              )
            }
          })
        : null}
      {fields?.length ? (
        <div className="w-full mt-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name={'consent'}
              checked={consent}
              onChange={() => setConsent((prev) => !prev)}
            />
            <label htmlFor="consent">I agree to submit this form!</label>
          </div>
          <Button
            disabled={pending || !consent}
            type="submit"
            className="w-full mt-4"
          >
            Submit
          </Button>
        </div>
      ) : (
        <div>
          No fields to display
          <Button variant="secondary" className="mt-4 w-full">
            Go to home
          </Button>
        </div>
      )}
    </form>
  )
}

export default Form
