// @ts-nocheck

'use server'

import { auth } from '@/lib/auth'
import { FormField, PageData } from '@/types/types'
import { dbReq, dbReqWithoutBody } from '@/utils/xataRequest'
import { generateColumns } from '@/utils/generateColumns'
import { type Session } from 'next-auth'
import { model } from '@/lib/model'
import { getXataClient } from '@/lib/xata'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const xata = getXataClient()

export async function getSession(): Promise<Session> {
  let session = await auth()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  return session
}

export async function updateProfile(formData: FormData) {
  const session = await getSession()
  if (session) {
    const image = formData.get('avatar')
    const res = await xata.db.nextauth_users.update(session.user.id, {
      name: formData.get('name') as string,
      avatar: {
        name: image?.name,
        mediaType: image?.type,
        base64Content: formData.get('file'),
        enablePublicUrl: true,
      },
    })

    res?.update({ image: res?.avatar?.url })
    return res
  }
}

export async function getRecordCount(table: string) {
  const totalNumberOfSubmissions = await xata.db[table].summarize({
    columns: [],
    summaries: {
      count: { count: '*' },
    },
  })
  return totalNumberOfSubmissions.summaries[0].count
}

export async function bulkExportData(table: string) {
  const session = await getSession()
  if (session) {
    const data = await xata.db[table].getAll()
    return data.map((item: any) => {
      const { id, xata, ...rest } = item
      return {
        ...rest,
        'Submitted at': new Date(xata.createdAt).toLocaleString(),
      }
    })
  }
}

export async function getData(table: string) {
  const session = await getSession()
  if (session) {
    const data = await xata.db[table].getPaginated({
      pagination: { size: 10, offset: 0 },
    })
    return data.map((item: any) => {
      const { id, xata, ...rest } = item
      return {
        ...rest,
        'Submitted at': new Date(xata.createdAt).toLocaleString(),
      }
    })
  }
}

export async function getDataFromTable(table: string) {
  const session = await getSession()
  if (session) {
    const res = await xata.db.forms.filter({ slug: table }).getFirst()
    if (res?.createdBy?.id === session?.user?.id) {
      // const data = await dbReq({
      //   method: 'POST',
      //   path: `/tables/${table}/query`,
      // })
      const data = await xata.db[table].getMany()
      // console.log('testdata', testdata)
      return data.map((item: any) => {
        const { id, xata, ...rest } = item
        return {
          ...rest,
          'Submitted at': new Date(xata.createdAt).toLocaleString(),
        }
      })
    } else {
      // throw new Error('Caught you! You are not authorized to view this page.')
      redirect(`/form/${table}/error`)
    }
  }
}

export async function createTable(table: string, fields: FormField[]) {
  const session = await getSession()
  if (session) {
    // step-1: create table
    const tableData = await dbReq({ method: 'PUT', path: `/tables/${table}` })
    console.log('tableData', tableData)

    // step-2: add schema
    const columns = generateColumns(fields)
    console.log('columns', columns)
    const schemaData = await dbReq({
      method: 'PUT',
      path: `/tables/${table}/schema`,
      body: { columns },
    })

    if (schemaData.status !== 'completed') {
      await dbReqWithoutBody({ method: 'DELETE', path: `/tables/${table}` })
    }
    console.log('schemaData', schemaData)

    revalidatePath('/app')

    return schemaData
  }
}

export async function updateTable(table: string, fields: FormField[]) {
  const session = await getSession()
  if (session) {
    const columns = generateColumns(fields)
    console.log('columns', columns)
    const schemaData = await dbReq({
      method: 'PUT',
      path: `/tables/${table}/schema`,
      body: { columns },
    })
    console.log('schemaData', schemaData)

    return schemaData
  }
}

export async function deleteForm(record: string, slug: string) {
  const session = await getSession()
  if (session) {
    await dbReqWithoutBody({
      method: 'DELETE',
      path: `/tables/forms/data/${record}`,
    })
    await dbReqWithoutBody({ method: 'DELETE', path: `/tables/${slug}` })

    revalidatePath('/app')

    return {
      staus: 'success',
      message: 'Form deleted successfully!',
    }
  }
}

export async function generateJson(prompt: string, old = {}) {
  const session = await getSession()
  if (session) {
    const res = await model(old, prompt)
    console.log({ modelRes: res })
    return res
  }
}

export async function addPage(
  table: string,
  title: string,
  description: string,
  input: PageData,
  prompt?: string
) {
  const session = await getSession()
  if (session) {
    const res = await xata.db.forms.create({
      name: title ? title : input.title,
      description,
      page: input,
      createdBy: session?.user?.id,
      slug: table,
      prompt,
    })
    return res
  }
}

export async function handleFormSubmission(table: string, values: Object) {
  const res = await dbReq({
    method: 'POST',
    path: `/tables/${table}/data`,
    body: { ...values },
  })

  // if (table !== '') {
  //   const res = await xata.db[table].create({ ...values })
  // }

  console.log('res', res)
  return res
}
