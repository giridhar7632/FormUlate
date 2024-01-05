import { getXataClient } from "@/lib/xata";
import Form from "./Form";
const xata = getXataClient();

export async function generateStaticParams() {
  const forms = await xata.db.forms.getAll()

  return forms.map((form) => ({
    slug: form.slug,
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const record = await xata.db.forms.filter({ slug: params.slug }).select(["createdBy.name", "createdBy.id", "name", "page"]).getFirst();
    return (
        <div>
          <h1>{record?.name}</h1>
            <p><i>created by:</i> {record?.createdBy?.name}</p>
            <p><i>created at:</i> {record?.xata.createdAt?.toString().substring(0,16)}</p>

            <Form fields={record?.page.fields} />
        </div>
    )
}