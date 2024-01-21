import { auth } from '@/lib/auth'
import Link from 'next/link'
import Button from '@/components/Button'
import { redirect } from 'next/navigation'
import ProfileMenu from '@/components/ProfileMenu'
import Image from 'next/image'
import { ThemeSwitch } from '@/components/Theme'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user) redirect('/auth/login')
  return (
    <div className="max-w-5xl min-h-screen px-4 lg:px-0 mx-auto overflow-x-hidden">
      <nav className="flex py-4 items-center justify-between px-2">
        <Link className="flex items-center justify-center" href="/">
          <Image
            alt="Formulate logo"
            src="/formulate.svg"
            width={32}
            height={32}
          />
          <span className="sr-only">FormUlate</span>
        </Link>
        <div className="flex items-center justify-end gap-3">
          {session?.user ? (
            <ProfileMenu {...session.user} />
          ) : (
            <Link href={'/auth/login'}>
              <Button>Login</Button>
            </Link>
          )}
          <ThemeSwitch />
        </div>
      </nav>
      <main className="flex w-full h-full flex-col items-center justify-between py-24">
        {children}
      </main>
    </div>
  )
}
