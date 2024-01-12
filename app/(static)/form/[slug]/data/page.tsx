import { Suspense } from 'react'
import { LoaderIcon } from 'react-hot-toast'
import Table from './Table'

export default function Data({ params }: { params: { slug: string } }) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold md:text-5xl/none">Submissions</h1>
      <div className="flex my-6 flex-col">
        <Suspense fallback={<LoaderIcon />}>
          <Table table={params.slug} />
        </Suspense>
      </div>
    </div>
  )
}
