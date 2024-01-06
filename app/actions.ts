'use server';

import { auth } from '@/lib/auth';
import { FormField } from '@/lib/types';
import { dbReq } from '@/utils/xataRequest';
import { generateColumns } from '@/utils/generateColumns';
import { type Session } from 'next-auth'

export async function getSession(): Promise<Session> {
  let session = await auth();
  if (!session || !session.user) {
    throw new Error('Unauthorized');
  }

  return session;
}

export async function createTable(table: string, fields: FormField[]) {
  const session = await getSession();
  if(session){
    const tableData = await dbReq('PUT', `/tables/${table}`, {});
    const columns = generateColumns(fields);
    console.log('columns', columns)
    const schemaData = await dbReq('PUT', `/tables/${table}/schema`, {})
    console.log('schemaData', schemaData)
  
    return tableData;
  }
}