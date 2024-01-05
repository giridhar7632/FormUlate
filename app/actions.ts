'use server';

import { auth } from '@/lib/auth';
import { type Session } from 'next-auth'

export async function getSession(): Promise<Session> {
  let session = await auth();
  if (!session || !session.user) {
    throw new Error('Unauthorized');
  }

  return session;
}