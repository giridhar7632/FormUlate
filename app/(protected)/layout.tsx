import { auth } from "@/lib/auth"
import Link from "next/link"
import Button from "@/components/Button"
import { redirect } from "next/navigation"
import ProfileMenu from "@/components/ProfileMenu"

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const session = await auth()
    if(!session?.user) redirect('/auth/login')
    return (
        <>
            <nav className='flex py-4 items-center justify-between'>
                <p>FormUlate</p>
                {session?.user ? <ProfileMenu {...session.user} />  : <Link href={'/auth/login'}>
						<Button>Login</Button>
					</Link>}
            </nav>
            <main className='flex w-full h-full flex-col items-center justify-between py-24'>
                { children }
            </main>
        </>
    )
}