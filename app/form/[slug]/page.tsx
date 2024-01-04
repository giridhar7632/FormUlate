import { getXataClient } from "@/utils/xata";
import Form from "./Form";
const xata = getXataClient();

export async function generateStaticParams() {
  const forms = await xata.db.forms.getAll()
  return forms.map((i) => ({
    slug: i.id,
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  console.log({params})
  const record = await xata.db.forms.read(params.slug);
  console.log(record)

    return (
        <div>
          <h1>{record?.name}</h1>
            <p><i>created by:</i> {record?.createdBy?.id}</p>
            <p><i>created at:</i> {record?.xata.createdAt?.toString().substring(0,16)}</p>

            <Form fields={record?.page.fields} />
        </div>
    )
}