'use client'

import Button from '@/components/Button'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="max-w-5xl min-h-screen px-4 lg:px-0 mx-auto overflow-x-hidden flex flex-col">
            <main className="flex-1 mx-auto py-24">
                <div className="w-80 sm:w-96 flex flex-col border bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-600 rounded-2xl p-6 md:p-12">
                    <Image className="mx-auto" width={72} height={72} src="/formulate.svg" alt="FormUlate Logo" />
                    <h1 className="my-6 text-center text-2xl">Aww x_x</h1>
                    <p className="text-center">Something went wrong!</p>
                    <Link className="mx-auto mt-6" href={'/'}>
                        <Button variant="secondary">Go to home</Button>
                    </Link>
                    <p className="text-xs text-center text-gray-400 my-4">
                        If this is not what expected, let us know{' '}
                        <Link className="underline underline-offset-4 text-blue-500" href="/form/contact-us">
                            here.
                        </Link>{' '}
                    </p>
                </div>
            </main>
        </div>
    )
}
