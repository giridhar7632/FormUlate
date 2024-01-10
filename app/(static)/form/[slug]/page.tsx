import { getXataClient } from '@/lib/xata'
import Form from './Form'
const xata = getXataClient()

export async function generateStaticParams() {
  const forms = await xata.db.forms.getAll()

  return forms.map((form) => ({
    slug: form.slug,
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const record = await xata.db.forms
    .filter({ slug: params.slug })
    .select(['createdBy.name', 'createdBy.id', 'name', 'page'])
    .getFirst()
  return (
    <div className="p-12 w-full border border-gray-100 rounded-2xl shadow-sm">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{record?.name}</h1>
      <p className="text-sm text-gray-500">
        <i>created by:</i> {record?.createdBy?.name}
      </p>
      <div className="h-1 my-6 border border-gray-100"></div>
      <Form
        table={params.slug}
        owner={record?.createdBy?.name?.split(' ')[0] as string}
        fields={record?.page.fields}
      />
    </div>
  )
}
