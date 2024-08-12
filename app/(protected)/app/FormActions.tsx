"use client";

import copy from "copy-text-to-clipboard";

import { Kebab } from "@/lib/icons";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteButton from "./DeleteButton";

export default function FormActions({
  id,
  slug,
}: {
  id: string;
  slug: string;
}) {
  const [fullLink, setFullLink] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullLink(`${window.location.origin}/form/${slug}`);
    } else {
      setFullLink(`https://formulate-six.vercel.app/form/${slug}`);
    }
  }, [slug]);

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={clsx(
              open && "text-opacity-90",
              "h-lg cursor-pointer focus:outline-0 border border-gray-200 rounded-xl p-2 leading-snug transition duration-150 hover:ring focus:ring hover:bg-gray-100 hover:ring-gray-200 focus:ring-gray-200 dark:text-gray-500 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:ring-gray-700 dark:focus:ring-gray-700 text-gray-700",
            )}
          >
            <Kebab height={16} />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 trangray-y-1"
            enterTo="opacity-100 trangray-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 trangray-y-0"
            leaveTo="opacity-0 trangray-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 mt-3 w-52 transform  rounded-lg bg-white dark:bg-gray-800 sm:px-0 lg:max-w-3xl dark:border dark:border-gray-600">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <Link
                  href={`/form/${slug}/data`}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  View submissions
                </Link>
                <button
                  onClick={() => {
                    try {
                      copy(fullLink);
                      toast.success("Copied to clipboard! 🎉");
                    } catch (error) {
                      console.error(error);
                      toast.error(
                        "Failed to copy to clipboard! 😢\n Please try again.",
                      );
                    }
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  Copy link
                </button>

                <DeleteButton slug={slug} id={id} />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
