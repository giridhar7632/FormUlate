"use client"

import { useRef } from "react"
import { useFormStatus } from "react-dom"

const Prompt =  () => {
    const formRef = useRef<HTMLFormElement>(null)
    const { pending } = useFormStatus()

    return (
        <form ref={formRef} action={(formData) => {
            console.log(formData.get('prompt'))
            formRef.current?.reset()
        }} className="flex justify-center items-center h-screen bg-gray-100">
            <textarea name="prompt" disabled={pending} className="w-96 h-60 p-4 bg-white border border-gray-300 rounded shadow" />
            <input type="submit" value="Create" />
        </form>
    )
}

export default Prompt