'use client'

import Button from '@/components/Button'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="max-w-5xl min-h-screen px-4 lg:px-0 mx-auto overflow-x-hidden flex flex-col">
      <main className="flex-1 mx-auto py-24">
        <div className="w-80 sm:w-96 flex flex-col border border-gray-200 rounded-2xl p-6 md:p-12">
          <Image
            className="mx-auto"
            width={72}
            height={72}
            src="/formulate.svg"
            alt="FormUlate Logo"
          />
          <h1 className="my-6 text-center text-2xl">Aww!</h1>
          <p className="text-center">Something went wrong!</p>
          <Link className="mx-auto mt-6" href={'/'}>
            <Button variant="secondary">Go to home</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
