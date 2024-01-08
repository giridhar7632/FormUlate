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
    <main className="flex w-full h-full flex-col items-center justify-between py-24">
      <div className="w-80 sm:w-96 flex flex-col border border-gray-200 rounded-2xl p-6 md:p-12">
        {children}
      </div>
    </main>
  )
}
