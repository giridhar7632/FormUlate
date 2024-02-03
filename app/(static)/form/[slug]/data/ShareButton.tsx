'use client'

import Button from '@/components/Button'
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import copy from 'copy-text-to-clipboard'
import toast from 'react-hot-toast'

const ShareButton = ({ slug }: { slug: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [fullLink, setFullLink] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFullLink(`${window.location.origin}/form/${slug}`)
    } else {
      setFullLink(`https://formulate-six.vercel.app/form/${slug}`)
    }
  }, [slug])

  const handleClose = () => setIsOpen(false)
  const handleOpen = () => setIsOpen(true)

  return (
    <>
      <button
        className="h-lg flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 leading-snug transition duration-150 hover:ring focus:ring text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:ring-gray-200 dark:hover:ring-gray-700 focus:ring-gray-200 focus:border-gray-200 dark:focus:ring-gray-700 border-2 focus:outline-0 border-gray-200 dark:border-gray-600"
        onClick={handleOpen}
      >
        Share form
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="z-100 fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="mb-5 text-lg font-semibold leading-6 text-gray-800 dark:text-gray-100"
                  >
                    Share form link
                  </Dialog.Title>
                  <div className="my-2 flex items-center gap-2">
                    <input
                      name="link"
                      type="link"
                      defaultValue={fullLink}
                      className="flex-1 bg-gray-100 dark:bg-gray-700 dark:border dark:border-gray-600 bg-clip-padding px-4 py-2 font-normal text-gray-700 dark:text-gray-100 focus:border focus:ring-2
                      m-0 rounded-xl transition ease-in-out focus:outline-none focus:ring-blue-100 dark:focus:ring-blue-400"
                    />
                    <Button
                      onClick={() => {
                        try {
                          copy(fullLink)
                          toast.success('Copied to clipboard! 🎉')
                          handleClose()
                        } catch (error) {
                          console.error(error)
                          toast.error(
                            'Failed to copy to clipboard! 😢\n Please try again.'
                          )
                        }
                      }}
                    >
                      Copy
                    </Button>
                  </div>

                  {/* <div className="mt-4 flex items-center space-x-4">
                    <Button
                      className="flex-1"
                      variant="outline"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ShareButton
