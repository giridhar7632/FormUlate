'use client'

import { bulkExportData } from '@/app/actions'
import { Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment } from 'react'
import toast from 'react-hot-toast'
import * as XLSX from 'xlsx'

export default function Export({ table, data }: { table: string; data: any }) {
  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,

      `Exported data`
    )
    XLSX.writeFile(workbook, `${table}.xlsx`)
  }

  const handleBulkExport = async () => {
    try {
      const bulkData = await bulkExportData(table)
      const worksheet = XLSX.utils.json_to_sheet(bulkData)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,

        `Bulk export`
      )
      XLSX.writeFile(workbook, `bulk-${table}.xlsx`)
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong! 😕')
    }
  }

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={clsx(
              open && 'text-opacity-90',
              'h-lg flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 leading-snug transition duration-150 ease-in-out hover:ring focus:ring hover:bg-gray-100 hover:ring-gray-200 focus:ring-gray-200 focus:border-gray-200 border-2 border-gray-200'
            )}
          >
            Export
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
                <button
                  onClick={handleBulkExport}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Export complete data
                </button>
                <button
                  onClick={handleExportToExcel}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Export current view
                </button>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
