"use client";

import Button from "@/components/Button";
import { deleteForm } from "@/lib/firebase/firestore";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

const DeleteButton = ({ slug, id, removeForm }: { slug: string; id: string; removeForm: (id: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  async function handleDelete() {
    try {
      const res = await deleteForm(id, slug);
      removeForm(id)
      setIsOpen(false);
      toast.success(res?.message || "Form deleted!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to perform the action! 😢\n Please try again.");
    }
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
      >
        Delete form
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={handleClose}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="mb-5 text-lg font-semibold leading-6 text-gray-800 dark:text-gray-100"
                  >
                    Delete form
                  </DialogTitle>
                  <div className="my-2 flex flex-col items-center gap-2">
                    <p>
                      Are you sure you want to delete this form? This will also
                      delete all the submissions in the database.
                    </p>
                  </div>

                  <div className="mt-4 flex items-center space-x-4">
                    <Button
                      className="flex-1"
                      variant="outline"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="danger"
                      className="flex-1"
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeleteButton;
