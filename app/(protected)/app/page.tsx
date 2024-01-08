import Button from '@/components/Button'
import { auth } from '@/lib/auth'
import { getXataClient } from '@/lib/xata'
import Link from 'next/link'

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
        <Link href="/create">
          <Button>Create new form</Button>
        </Link>
      </div>
      <div className="flex gap-4 items-center flex-wrap">
        {forms.map((form) => (
          <div
            key={form.id}
            className="flex-1 min-w-[40%] border shadow-sm hover:shadow-md border-gray-100 rounded-xl"
          >
            <Link href={`/form/${form.slug}`}>
              <div className="p-4 md:p-6">
                <p className="text-blue-500">{form.name}</p>
                <p className="text-sm text-gray-500">
                  created on: {form.xata.createdAt.toDateString().substring(4)}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
