'use client'

import { Kebab } from '@/lib/icons'
import { Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'
import Link from 'next/link'
import { Fragment } from 'react'

export default function FormActions({ slug }: { slug: string }) {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={clsx(
              open && 'text-opacity-90',
              'h-lg cursor-pointer focus:outline-0 focus:border-2 rounded-xl p-2 leading-snug transition duration-150 ease-in-out hover:ring focus:ring hover:bg-gray-100 hover:ring-gray-200 focus:ring-gray-200 focus:border-gray-300 text-gray-500'
            )}
          >
            <Kebab height={16} />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 mt-3 w-52 transform  rounded-lg bg-white px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <Link
                  href={`/form/${slug}/data`}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  View submissions
                </Link>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
