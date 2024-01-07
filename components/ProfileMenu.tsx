'use client'

import { Logout } from '@/lib/icons'
import { Popover, Transition } from '@headlessui/react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'

type ProfileMenuProps = {
  name?: string | null | undefined
  email?: string | null | undefined
  image?: string | null | undefined
}

export default function ProfileMenu({ name, email, image }: ProfileMenuProps) {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                ${open ? '' : 'text-opacity-90'}
                mx-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 md:mr-0`}
          >
            <Image
              width={32}
              height={32}
              className="h-8 w-8 rounded-full"
              src={image || 'https://api.multiavatar.com/v.png'}
              alt={name || 'Avatar'}
            />
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
                <Link href="/profile">
                  <div className="px-4 py-2 text-sm text-gray-900 border-b border-gray-100">
                    <div className="text-xs text-gray-400">Logged in as:</div>
                    <div className="font-semibold mt-2">{name}</div>
                    <div className="truncate text-gray-500">{email}</div>
                  </div>
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Logout width={18} />
                  <span>Sign out</span>
                </button>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
