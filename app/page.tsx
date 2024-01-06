import Link from "next/link";
import Button from "../components/Button";
import { auth } from "@/lib/auth";
import { SignOut } from "./auth/Methods";
import ProfileMenu from "../components/ProfileMenu";

export default async function Home() {
  const session = await auth()
  return (
    <>
      <nav className='flex py-4 items-center justify-between'>
          <p>FormUlate</p>
					{session?.user ? <ProfileMenu {...session.user} />  : <Link href={'/auth/login'}>
						<Button>Login</Button>
					</Link>}
				</nav>
    <main className='flex w-full h-full flex-col items-center justify-between py-24'>
      <h1>Generate simple forms from language</h1>
    </main>
    </>
  )
}
