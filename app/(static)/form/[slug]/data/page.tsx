import { Suspense } from 'react'
import { LoaderIcon } from 'react-hot-toast'
import Table from './Table'
import { getXataClient } from '@/lib/xata'
import Export from './Export'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getRecordCount } from '@/app/actions'

const xata = getXataClient()

export default async function Data({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { page: string }
}) {
  const session = await auth()
  const form = await xata.db.forms.filter({ slug: params.slug }).getFirst()
  if (form?.createdBy?.id !== session?.user?.id) {
    redirect(`/form/${params.slug}/error`)
  }
  const pageNumber = parseInt(searchParams.page) || 1

  const recordPagePromise = xata.db[params.slug]
    .sort('xata.createdAt', 'desc')
    .getPaginated({
      pagination: { size: 12, offset: 12 * pageNumber - 12 },
    })

  const recordCountPromise = getRecordCount(params.slug)

  console.time('Fetching images')
  const [recordsPage, recordCount] = await Promise.all([
    recordPagePromise,
    recordCountPromise,
  ])
  console.timeEnd('Fetching images')

  const totalNumberOfPages = Math.ceil(recordCount / 12)

  // This page object is needed for building the buttons in the pagination component
  const page = {
    pageNumber,
    hasNextPage: recordsPage.hasNextPage(),
    hasPreviousPage: pageNumber > 1,
    totalNumberOfPages,
  }

  // const res = await xata.db[params.slug].getPaginated({
  //   pagination: { size: 10, offset: 0 },
  // })
  const data = recordsPage.records.map((item: any) => {
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
