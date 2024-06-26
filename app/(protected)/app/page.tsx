import Button from '@/components/Button'
import { auth } from '@/lib/auth'
import { getXataClient } from '@/lib/xata'
import Link from 'next/link'
import FormActions from './FormActions'

const xata = getXataClient()

export default async function Page() {
  const session = await auth()
  const forms = await xata.db.forms
    .filter({ createdBy: session?.user?.id })
    .select(['name', 'slug'])
    .getAll()

  return (
    <div className="w-full">
      <p className="text-xl">
        Hi there! <b>{session?.user?.name}</b>
      </p>
      <div className="w-full my-4 flex items-center justify-between">
        <h2 className="text-2xl text-gray-500 truncate">Your forms</h2>
        <Link className="mr-1" href="/create">
          <Button>Create new form</Button>
        </Link>
      </div>
      <div className="flex gap-4 flex-col md:flex-row items-center flex-wrap">
        {forms.length ? (
          forms.map((form) => (
            <div
              key={form.id}
              className="flex-1 p-4 md:p-6 flex items-center justify-between w-full md:min-w-[40%] border shadow-sm hover:shadow-md border-gray-200 rounded-xl bg-white dark:border-gray-600 dark:bg-gray-800"
            >
              <Link href={`/form/${form.slug}`}>
                <p className="text-blue-500">{form.name}</p>
                <p className="text-sm text-gray-500">
                  created on: {form.xata.createdAt.toDateString().substring(4)}
                </p>
              </Link>
              <FormActions id={form.id} slug={form.slug as string} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-24">
            No forms yet! Click on the button above to create new forms.
          </p>
        )}
      </div>
    </div>
  )
}
