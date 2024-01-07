import type { Metadata } from 'next'
import { Prompt } from 'next/font/google'
import './globals.css'
import { auth } from '@/lib/auth'
import { SessionProvider } from 'next-auth/react'

const prompt = Prompt({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata: Metadata = {
  title: 'FormUIate',
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
        <body
          className={`max-w-5xl min-h-screen px-4 lg:px-0 mx-auto overflow-x-hidden ${prompt.className}`}
        >
          {children}
        </body>
      </html>
    </SessionProvider>
  )
}
