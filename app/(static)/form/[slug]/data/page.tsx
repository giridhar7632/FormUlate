import { Suspense } from 'react'
import { LoaderIcon } from 'react-hot-toast'
import Table from './Table'
import { getXataClient } from '@/lib/xata'
import Export from './Export'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

const xata = getXataClient()

export default async function Data({ params }: { params: { slug: string } }) {
  const session = await auth()
  const form = await xata.db.forms.filter({ slug: params.slug }).getFirst()
  if (form?.createdBy?.id !== session?.user?.id) {
    redirect(`/form/${params.slug}/error`)
  }
  const res = await xata.db[params.slug].getAll()
  const data = res.map((item: any) => {
    const { id, xata, ...rest } = item
    return {
      ...rest,
      'Submitted at': new Date(xata.createdAt).toLocaleString(),
    }
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold md:text-5xl/none">Submissions</h1>
        <Export table={params.slug} data={data} />
      </div>
      <div className="my-6">
        <Suspense fallback={<LoaderIcon />}>
          {data.length ? (
            <Table data={data} />
          ) : (
            <p className="text-gray-500">
              No submissions yet! Share the form with your friends to get
              started.
            </p>
          )}
        </Suspense>
      </div>
    </div>
  )
}
