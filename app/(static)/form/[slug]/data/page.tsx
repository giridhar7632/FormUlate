import { getDataFromTable } from '@/app/actions'
import { Suspense } from 'react'
import { LoaderIcon } from 'react-hot-toast'

export default function Data({ params }: { params: { slug: string } }) {
  return (
    <div className="flex flex-col gap-4">
      {' '}
      Submissions!
      <div className="flex flex-col">
        <Suspense fallback={<LoaderIcon />}>
          <TableResponses table={params.slug} />
        </Suspense>
      </div>
    </div>
  )
}

const TableResponses = async ({ table }: { table: string }) => {
  const data = await getDataFromTable(table)
  return data.map((record: any) => (
    <div
      className="p-12 w-full border border-gray-100 rounded-2xl shadow-sm"
      key={record.id}
    >
      {record.name}
    </div>
  ))
}
