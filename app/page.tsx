import Link from "next/link";
import Button from "./components/Button";

export default function Home() {
  return (
    <>
    <nav className='flex py-4 items-center justify-between'>
					<p>FormUlate</p>
					<Link href={'/auth/login'}>
						<Button>Login</Button>
					</Link>
				</nav>
      <h1>Generate simple forms from language</h1>
    </>
  )
}
