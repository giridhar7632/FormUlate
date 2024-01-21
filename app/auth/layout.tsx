import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (session?.user) redirect('/app')
  return (
    <div className="max-w-5xl min-h-screen px-4 lg:px-0 mx-auto overflow-x-hidden">
      <main className="flex w-full h-full flex-col items-center justify-between py-24">
        <div className="w-80 sm:w-96 flex flex-col bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-600 rounded-2xl p-6 md:p-12">
          {children}
        </div>
      </main>
    </div>
  )
}
