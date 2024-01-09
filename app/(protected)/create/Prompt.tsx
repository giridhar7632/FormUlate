'use client'

import Button from '@/components/Button'
import clsx from 'clsx'
import { useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { createTable, updateTable, generateJson, addPage } from '@/app/actions'
import { generateSlug } from '@/utils/generateSlug'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast, { CheckmarkIcon } from 'react-hot-toast'
import Spinner from '@/components/Spinner'
import { extractAndParseJson } from '@/utils/extractAndParseJson'

const Prompt = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const { pending } = useFormStatus()
  const router = useRouter()
  const { data } = useSession()
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [generatingForm, setGeneratingForm] = useState('pending')
  const [creatingTable, setCreatingTable] = useState('pending')
  const [addingPage, setAddingPage] = useState('pending')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('prompt:', prompt)
    setLoading(true)
    try {
      if (prompt !== '') {
        setGeneratingForm('started')
        let res = await generateJson(prompt)
        res = extractAndParseJson(res)
        setGeneratingForm('completed')
        setCreatingTable('started')
        const table = generateSlug(data?.user.id as string, res.title)
        if (res.fields.length === 0)
          throw new Error('Add at least one field 😁')
        let tableRes
        if (res.action === 'create') {
          tableRes = await createTable(table, res.fields)
        } else {
          tableRes = await updateTable(table, res.fields)
        }
        setCreatingTable('completed')

        console.log({ tableRes })

        setAddingPage('started')
        if (tableRes.status === 'completed') {
          await addPage(table, res)
          setAddingPage('completed')
          router.push(`/form/${table}`)
        } else {
          throw new Error('Something went wrong when creating your form! 😕')
        }
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong! 😕')
    } finally {
      setGeneratingForm('pending')
      setCreatingTable('pending')
      setAddingPage('pending')
      setLoading(false)
    }
    formRef.current?.reset()
  }

  return (
    <form
      ref={formRef}
      className="w-full flex flex-col items-center justify-center"
      onSubmit={handleSubmit}
    >
      {loading ? (
        <div className="flex w-full flex-col items-center justify-center">
          <LoadAnimation
            loading={generatingForm === 'started'}
            completed={generatingForm === 'completed'}
            text="Generating form"
          />
          <LoadAnimation
            loading={creatingTable === 'started'}
            completed={creatingTable === 'completed'}
            text="Creating table"
          />
          <LoadAnimation
            loading={addingPage === 'started'}
            completed={addingPage === 'completed'}
            text="Adding page"
          />
        </div>
      ) : (
        <>
          <textarea
            name="prompt"
            onChange={(e) => setPrompt(e.target.value)}
            disabled={pending}
            placeholder="I need a form to collect user feedback for my product. The form should have fields for collecting the user data like name, email, gender and their valuable feedback ..."
            className={clsx([
              'min-h-96 w-full sm:w-[600px] bg-gray-100 bg-clip-padding mb-4 p-6 font-normal text-gray-700 focus:border focus:ring-2',
              'rounded-xl transition ease-in-out focus:border-blue-500 focus:text-gray-700 focus:outline-none focus:ring-blue-100',
            ])}
          />
          <Button className="w-48" type="submit">
            Generate
          </Button>{' '}
        </>
      )}
    </form>
  )
}

function LoadAnimation({
  loading,
  text,
  completed,
}: {
  loading: boolean
  text: string
  completed: boolean
}) {
  return (
    <div className="flex gap-2 my-2 items-center justify-center">
      {completed ? <CheckmarkIcon /> : <Spinner loading={loading} size={18} />}
      <p
        className={clsx(
          'transition duration-300 ease-in-out',
          loading && 'text-blue-500 text-lg',
          completed && 'text-green-500',
          !loading && !completed && 'text-gray-500 text-sm'
        )}
      >
        {text}...
      </p>
    </div>
  )
}

export default Prompt
