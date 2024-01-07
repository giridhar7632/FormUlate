import Button from '@/components/Button'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <Image
        className="mx-auto"
        width={72}
        height={72}
        src="/logo.png"
        alt="FormUlate Logo"
      />
      <h1 className="my-6 text-center text-2xl">Oops!</h1>
      <p className="text-center">Something went wrong while signing you in!</p>
      <Link className="mx-auto mt-6" href={'/auth/login'}>
        <Button variant="secondary">Try again</Button>
      </Link>
    </>
  )
}
