"use client"

import Button from "@/components/Button"
import clsx from "clsx"
import { useRef } from "react"
import { useFormStatus } from "react-dom"

const Prompt =  () => {
    const formRef = useRef<HTMLFormElement>(null)
    const { pending } = useFormStatus()

    return (
        <form ref={formRef} action={(formData) => {
            console.log(formData.get('prompt'))
            formRef.current?.reset()
        }}>
            <textarea name="prompt" disabled={pending}
            placeholder="I need a form to collect user feedback for my product. The form should have fields for collecting the user data like name, email, gender and their valuavke feedback....." className={clsx([
					'min-h-96 w-full md:w-[600px] bg-gray-100 bg-clip-padding mb-4 p-6 font-normal text-gray-700 focus:border focus:ring-2',
					'm-0 rounded-xl transition ease-in-out focus:border-blue-500 focus:text-gray-700 focus:outline-none focus:ring-blue-100'])} />
            <Button className="w-48 mx-auto" type="submit">Generate</Button>
        </form>
    )
}

export default Prompt