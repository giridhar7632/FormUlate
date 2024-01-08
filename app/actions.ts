'use server'

import { auth } from '@/lib/auth'
import { FormField } from '@/lib/types'
import { dbReq } from '@/utils/xataRequest'
import { generateColumns } from '@/utils/generateColumns'
import { type Session } from 'next-auth'

export async function getSession(): Promise<Session> {
  let session = await auth()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  return session
}

export async function createTableQuery(table: string) {
  const res = await dbReq({
    method: 'POST',
    path: '/sql',
    body: {
      statement: `create table "${table}" (name INT);`,
    },
  })

  console.log('res', res)
  return res
}

export async function createTable(table: string, fields: FormField[]) {
  const session = await getSession()
  if (session) {
    // const tableData = await dbReq({
    //   method: 'PUT',
    //   path: `/tables/${table}`,
    //   body: {},
    // })
    // console.log('tableData', tableData)
    const columns = generateColumns(fields)
    console.log('columns', columns)
    const schemaData = await dbReq({
      method: 'PUT',
      path: `/tables/${table}/schema`,
      body: { columns },
    })
    console.log('schemaData', schemaData)

    // return tableData
  }
}
