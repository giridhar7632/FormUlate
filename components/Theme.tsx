'use client'

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { Moon, Sun } from '@/lib/icons'
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment, useEffect, useState } from 'react'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export function ThemeSwitch() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <Popover className={'relative'}>
            {({ open }) => (
                <>
                    <PopoverButton
                        className={clsx(
                            open && 'text-opacity-90',
                            'h-lg cursor-pointer focus:outline-0 border border-gray-200 rounded-xl p-2 leading-snug transition duration-150 hover:ring focus:ring hover:bg-gray-100 hover:ring-gray-200 focus:ring-gray-200 dark:text-gray-500 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:ring-gray-700 dark:focus:ring-gray-700 text-gray-700',
                        )}
                    >
                        <div className="relative">
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute top-0 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </div>
                    </PopoverButton>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <PopoverPanel className="absolute right-0 z-10 mt-3 w-36 transform rounded-xl bg-white dark:bg-gray-800 sm:px-0 lg:max-w-3xl dark:border dark:border-gray-600">
                            <div className="overflow-hidden rounded-xl shadow-lg ring-1 ring-black ring-opacity-5">
                                <button
                                    className={clsx(
                                        'flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-none',
                                        theme === 'light'
                                            ? 'text-blue-500 bg-gray-100 dark:bg-gray-900'
                                            : 'text-gray-700 dark:text-gray-400',
                                    )}
                                    onClick={() => setTheme('light')}
                                >
                                    Light
                                </button>
                                <button
                                    className={clsx(
                                        'flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-none',
                                        theme === 'dark'
                                            ? 'text-blue-500 bg-gray-100 dark:bg-gray-900'
                                            : 'text-gray-700 dark:text-gray-400',
                                    )}
                                    onClick={() => setTheme('dark')}
                                >
                                    Dark
                                </button>
                                <button
                                    className={clsx(
                                        'flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-none',
                                        theme === 'system'
                                            ? 'text-blue-500 bg-gray-100 dark:bg-gray-900'
                                            : 'text-gray-700 dark:text-gray-400',
                                    )}
                                    onClick={() => setTheme('system')}
                                >
                                    System
                                </button>
                            </div>
                        </PopoverPanel>
                    </Transition>
                </>
            )}
        </Popover>
    )
}
