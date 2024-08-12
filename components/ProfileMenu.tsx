"use client";

import { signOut } from "@/lib/firebase/auth";
import { Logout } from "@/lib/icons";
import { Popover, Transition } from "@headlessui/react";
// import { signOut } from 'next-auth/react'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

type ProfileMenuProps = {
  displayName?: string | null | undefined;
  email?: string | null | undefined;
  photoURL?: string | null | undefined;
};

export default function ProfileMenu({
  displayName,
  email,
  photoURL,
}: ProfileMenuProps) {
  const router = useRouter();
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                ${open ? "" : "text-opacity-90"}
                mx-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:mr-0`}
          >
            <Image
              width={48}
              height={48}
              className="h-12 w-12 rounded-full"
              src={photoURL || "https://api.multiavatar.com/v.png"}
              alt={displayName || "Avatar"}
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
            <Popover.Panel className="absolute right-0 z-10 mt-3 w-52 transform  rounded-lg bg-white dark:bg-gray-800 sm:px-0 lg:max-w-3xl dark:border dark:border-gray-600">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <Link href="/profile">
                  <div className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-600">
                    <div className="text-xs text-gray-400">Logged in as:</div>
                    <div className="font-semibold mt-2">{displayName}</div>
                    <div className="truncate text-gray-500">{email}</div>
                  </div>
                </Link>

                <Link
                  href="/app"
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 border-b border-gray-200 dark:border-gray-600 dark:hover:bg-gray-900"
                >
                  Dashboard
                </Link>

                <Link
                  href="/create"
                  className="flex md:hidden w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 border-b border-gray-200 dark:border-gray-600 dark:hover:bg-gray-900"
                >
                  Create new form
                </Link>

                <button
                  onClick={async () => {
                    try {
                      await signOut();
                      router.push("/");
                    } catch (error) {}
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
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
  );
}
