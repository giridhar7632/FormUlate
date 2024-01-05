"use client"

import { useRef } from "react"
import { useFormStatus } from "react-dom"
import { FormField } from "@/lib/types"

type FormProps = {
    fields: FormField[];
  };

const Form: React.FC<FormProps> = ({ fields }) => {
  const formRef = useRef<HTMLFormElement>(null)
	const { pending } = useFormStatus()
    return (
        <div className="p-12 border border-gray-100">
            <form ref={formRef} action={async (formData) => {
				console.log(formData.get('gender_interests'))
				formRef.current?.reset()
			}}>
            {fields.length ? fields.map((i: FormField, idx) => {
                const {field, ...attr} = i
                if (field === 'select') {
                    return (
                      <select disabled={pending} key={idx} name={attr.name}>
                        {attr?.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    );
                  } else if (field === 'textarea') {
                    return (
                      <textarea
                        key={idx}
                        disabled={pending}
                        {...attr}
                      />
                    );
                  } if (field === "checkbox") {
                    return (
                      <fieldset name={attr.name} key={idx}>
                        <legend>{attr.label}</legend>
                        {attr?.options?.map((option) => (
                        <div key={option.value + idx}>
                          <input
                            key={option.value + idx}
                            type="checkbox"
                            name={attr.name}
                            value={option.value}
                            id={`${attr.name}-${option.value}`}
                          />
                          <label htmlFor={`${attr.name}-${option.value}`}>{option.label}</label>
                          </div>
                        ))}
                      </fieldset>
                    );
                  } else if (field === "radio") {
                    return (
                      <fieldset name={attr.name} key={idx}>
                        <legend>{attr.label}</legend>
                        {attr?.options?.map((option) => (
                          <div key={option.value + idx}
                          >
                          <input
                            type="radio"
                            name={attr.name}
                            value={option.value}
                            id={`${attr.name}-${option.value}`}
                          />
                          <label htmlFor={`${attr.name}-${option.value}`}>{option.label}</label>
                          </div>
                        ))}
                      </fieldset>
                    );
                  } else {
                    return (
                      <input
                      key={idx}
                      disabled={pending}
                        {...attr}
                      />
                    );
                  }
            }) : "Go to home" }
            </form>
        </div>
    )
} 

export default Form