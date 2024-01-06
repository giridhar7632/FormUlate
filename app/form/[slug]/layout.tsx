// import { auth } from "@/lib/auth"
import Link from "next/link"
import Image from "next/image"
// import Button from "@/components/Button"
// import ProfileMenu from "@/components/ProfileMenu"

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    // const session = await auth()
    return (
        <>
            <nav className='flex py-4 items-center justify-between'>
                <Link href="/">
                    <div className="flex items-baseline gap-4">
                        <Image alt="logo" src="/formulate.svg" width={32} height={32} />
                        <p className="text-xl">FormUlate</p>
                    </div>
                </Link>
                {/* {session?.user ? <ProfileMenu {...session.user} />  : <Link href={'/auth/login'}>
						<Button>Login</Button>
					</Link>} */}
            </nav>
            <main className='flex w-full h-full flex-col items-center justify-between py-24'>
                { children }
            </main>
        </>
    )
}