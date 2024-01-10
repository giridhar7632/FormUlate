'use server'

import { auth } from '@/lib/auth'
import { FormField, PageData } from '@/types/types'
import { dbReq } from '@/utils/xataRequest'
import { generateColumns } from '@/utils/generateColumns'
import { type Session } from 'next-auth'
import { model } from '@/lib/model'
import { XataClient } from '@/lib/xata'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const xata = new XataClient()

export async function getSession(): Promise<Session> {
  let session = await auth()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  return session
}

export async function getDataFromTable(table: string) {
  const session = await getSession()
  if (session) {
    const res = await xata.db.forms.filter({ slug: table }).getFirst()
    if (res?.createdBy?.id === session?.user?.id) {
      const data = await dbReq({
        method: 'POST',
        path: `/tables/${table}/query`,
      })
      return data.records
    } else {
      // throw new Error('Caught you! You are not authorized to view this page.')
      redirect('/app')
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
      await dbReq({ method: 'DELETE', path: `/tables/${table}` })
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

export async function generateJson(prompt: string, old = {}) {
  const session = await getSession()
  if (session) {
    const res = await model(old, prompt)
    return res
  }
}

export async function addPage(table: string, input: PageData) {
  const session = await getSession()
  if (session) {
    const res = await xata.db.forms.create({
      name: input.title,
      page: input,
      createdBy: session?.user?.id,
      slug: table,
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
