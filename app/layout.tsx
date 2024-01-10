import type { Metadata } from 'next'
import { Prompt } from 'next/font/google'
import './globals.css'
import { auth } from '@/lib/auth'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

const prompt = Prompt({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata: Metadata = {
  title: 'FormUlate',
  description: 'a simple AI app for crafting form UI from language',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`${prompt.className}`}>
          {children}
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  )
}
