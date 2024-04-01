'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function ShareForm({
  title,
  text,
  slug,
}: {
  title: string
  text: string
  slug: string
}) {
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(`${window.location.origin}/form/${slug}`)
    } else {
      setUrl(`https://formulate-six.vercel.app/form/${slug}`)
    }
  }, [slug])

  async function fn() {
    if (typeof window !== 'undefined') {
      console.log(window.navigator)
      if (!window.navigator.canShare) {
        toast.error(
          'Web Share API is not supported in this browser. 😕\nPlease copy link and share manually!'
        )
        return
      }

      try {
        await navigator.share({ title, text, url })
      } catch (err) {
        // console.error(err)
      }
    }
  }
  return (
    <button
      className="h-lg flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 leading-snug transition duration-150 hover:ring focus:ring text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:ring-gray-200 dark:hover:ring-gray-700 focus:ring-gray-200 focus:border-gray-200 dark:focus:ring-gray-700 border-2 focus:outline-0 border-gray-200 dark:border-gray-600"
      onClick={fn}
    >
      Share form
    </button>
  )
}
