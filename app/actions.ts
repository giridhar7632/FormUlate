'use server'

import { auth } from '@/lib/auth'
import { FormField, PageData } from '@/types/types'
import { dbReq } from '@/utils/xataRequest'
import { generateColumns } from '@/utils/generateColumns'
import { type Session } from 'next-auth'
import { model } from '@/lib/model'
import { XataClient } from '@/lib/xata'

const xata = new XataClient()

export async function getSession(): Promise<Session> {
  let session = await auth()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  return session
}

export async function createTable(table: string, fields: FormField[]) {
  const session = await getSession()
  if (session) {
    // step-1: create table
    const tableData = await dbReq({
      method: 'PUT',
      path: `/tables/${table}`,
      body: {},
    })
    console.log('tableData', tableData)

    // step-2: add schema
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

  console.log('res', res)
  return res
}
