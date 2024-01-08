'use client'

import Button from '@/components/Button'
import clsx from 'clsx'
import { useRef } from 'react'
import { useFormStatus } from 'react-dom'
import data from '@/utils/data.json'
import { useSession } from 'next-auth/react'
import { generateSlug } from '@/utils/generateSlug'
import { createTable, createTableQuery, generateJson } from '@/app/actions'
import { dbReq } from '@/utils/xataRequest'
import { extractAndParseJson } from '@/utils/extractAndParsejson'

const Prompt = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const { pending } = useFormStatus()
  const {
    data: { user },
  } = useSession()

  return (
    <form
      ref={formRef}
      className="w-full flex flex-col items-center justify-center"
      action={async (formData) => {
        console.log(formData.get('prompt'))
        try {
          // const formName = 'user-information-form'
          // await createTableQuery(generateSlug(user?.id, formName))
          // await createTable(generateSlug(user?.id, formName), data.fields)
          if (
            formData.get('prompt') !== null ||
            formData.get('prompt') !== ''
          ) {
            const res = await generateJson(formData.get('prompt') as string)
            console.log({ res: extractAndParseJson(res) })
          }
        } catch (error) {
          console.log(error)
        }
        formRef.current?.reset()
      }}
    >
      <textarea
        name="prompt"
        disabled={pending}
        placeholder="I need a form to collect user feedback for my product. The form should have fields for collecting the user data like name, email, gender and their valuable feedback ..."
        className={clsx([
          'min-h-96 w-full md:w-[600px] bg-gray-100 bg-clip-padding mb-4 p-6 font-normal text-gray-700 focus:border focus:ring-2',
          'rounded-xl transition ease-in-out focus:border-blue-500 focus:text-gray-700 focus:outline-none focus:ring-blue-100',
        ])}
      />
      <Button className="w-48" type="submit">
        Generate
      </Button>
    </form>
  )
}

export default Prompt
