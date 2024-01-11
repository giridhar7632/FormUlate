import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'

export default async function Page() {
  return (
    <>
      <Image
        className="mx-auto"
        width={72}
        height={72}
        src="/logo.png"
        alt="FormUlate Logo"
      />
      <h1 className="my-6 text-center text-2xl">Check your email</h1>
      <p className="text-center">
        ✨ {"Use that magic link we've sent to sign in to your account"}
      </p>
      <Link className="mx-auto mt-6" href={'/'}>
        <Button variant="secondary">Back to home</Button>
      </Link>
    </>
  )
}
