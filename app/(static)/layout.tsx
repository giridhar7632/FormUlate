// import { auth } from "@/lib/auth"
import Link from 'next/link'
import Image from 'next/image'
// import Button from "@/components/Button"
// import ProfileMenu from "@/components/ProfileMenu"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const session = await auth()
  return (
    <div className="max-w-5xl min-h-screen px-4 mx-auto overflow-x-hidden flex flex-col justify-between">
      <nav className="flex py-4 items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image alt="logo" src="/formulate.svg" width={20} height={20} />
            <p className="text-xl leading-none">FormUlate</p>
          </div>
        </Link>
        {/* {session?.user ? <ProfileMenu {...session.user} />  : <Link href={'/auth/login'}>
						<Button>Login</Button>
					</Link>} */}
      </nav>
      <main className="flex-1 w-full h-full py-24">{children}</main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <Link href={'/'} className="text-xs text-gray-500 dark:text-gray-400">
          © FormUlate.
        </Link>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="/terms"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="/policy"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
