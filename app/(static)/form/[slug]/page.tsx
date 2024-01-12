import { getXataClient } from '@/lib/xata'
import Form from './Form'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
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
    .select([
      'createdBy.name',
      'createdBy.email',
      'createdBy.id',
      'name',
      'page',
    ])
    .getFirst()
  return record ? (
    <div className="p-12 w-full border border-gray-100 rounded-2xl shadow-sm">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{record?.name}</h1>
      <p className="text-sm text-gray-500">
        <i>created by:</i>{' '}
        <Link
          className="cursor-pointer underline underline-offset-4"
          href={`/user/${record?.createdBy?.id}`}
        >
          {record?.createdBy?.name || record?.createdBy?.email}
        </Link>
      </p>
      <div className="h-1 my-6 border border-gray-100"></div>
      <Form
        table={params.slug}
        owner={record?.createdBy?.name?.split(' ')[0] as string}
        fields={record?.page.fields}
      />
    </div>
  ) : (
    <div className="w-80 mx-auto sm:w-96 flex flex-col border border-gray-200 rounded-2xl p-6 md:p-12">
      <Image
        className="mx-auto"
        width={72}
        height={72}
        src="/formulate.svg"
        alt="FormUlate Logo"
      />
      <h1 className="my-6 text-center text-2xl">Form not found</h1>
      <p className="text-center">
        {
          'The form you are searching is not found! Please check the link again.'
        }
      </p>
      <Link className="mx-auto mt-6" href={'/'}>
        <Button variant="secondary">Go to home</Button>
      </Link>
      <p className="text-xs text-center text-gray-400 my-4">
        If this is not what expected, let us know{' '}
        <Link
          className="underline underline-offset-4 text-blue-500"
          href="/form/contact-us"
        >
          here.
        </Link>
      </p>
    </div>
  )
}
