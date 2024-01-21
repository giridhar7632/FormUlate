import Link from 'next/link'
import Button from '@/components/Button'
import { auth } from '@/lib/auth'
import ProfileMenu from '@/components/ProfileMenu'
import Image from 'next/image'
import { getBlurDataUrl } from '@/utils/getBlurDataUrl'

export default async function Home() {
  const session = await auth()
  return (
    <>
      <header className="px-4 lg:px-6 py-4 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <Image
            alt="Formulate logo"
            src="/formulate.svg"
            width={32}
            height={32}
          />
          <span className="sr-only">FormUlate</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {session?.user ? (
            <div className="flex items-center gap-2">
              <Link className="hidden md:block" href={'/create'}>
                <Button>Create new form</Button>
              </Link>
              <ProfileMenu {...session.user} />
            </div>
          ) : (
            <Link href={'/auth/login'}>
              <Button>Login</Button>
            </Link>
          )}
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full relative pt-12 md:pt-24 lg:pt-32 border-y dark:border-gray-600">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  <span className="text-blue-500">FormUlate</span> simple forms
                  from language
                </h1>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-300 md:text-xl">
                  Type in your requirements and get the beautiful forms
                  generated with AI
                </p>
                <Link
                  href={'/auth/login'}
                  className="space-x-4 mx-auto md:mx-0"
                >
                  <Button variant="outline">Get Started</Button>
                </Link>
              </div>
            </div>
            <Image
              alt="cover"
              className="mx-auto aspect-[3/1] overflow-hidden rounded-t-2xl object-cover"
              height="300"
              src="/hero.webp"
              width="1300"
              priority={true}
              placeholder="blur"
              blurDataURL={getBlurDataUrl()}
            />
            <div
              style={{ zIndex: -1 }}
              className="blur-[100px] hidden dark:block absolute radial-gradient bg-purple-500 w-1/2 h-1/2 opacity-30 -bottom-20 -z-1"
            ></div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:text-gray-800">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Why Choose FormUlate?
                </h2>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed  ">
                  FormUlate is designed to make the creation of forms and data
                  collection easy and accessible.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-8 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid h-full gap-1 p-4 border border-gray-200 dark:border-gray-600 shadow-sm rounded-xl">
                <h3 className="text-lg font-bold">Prompt-Based Creation</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Simply tell us what you want your form to do, and we will
                  build it for you using the state-of-the-art Gemini Pro Model.
                </p>
              </div>
              <div className="grid h-full gap-1 p-4 border border-gray-200 dark:border-gray-600 shadow-sm rounded-xl">
                <h3 className="text-lg font-bold">Instant Shareable Pages</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Generate instant, sharable web page (using the unique link
                  provided) for your form with a single click.
                </p>
              </div>
              <div className="grid h-full gap-1 p-4 border border-gray-200 dark:border-gray-600 shadow-sm rounded-xl">
                <h3 className="text-lg font-bold">
                  Data Insights at your Fingertips
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Each form comes with a dedicated table in our database, making
                  data fetching and analysis a breeze (in progress).
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t dark:border-gray-600">
        <Link href={'/'} className="text-xs text-gray-500  ">
          © FormUlate.
        </Link>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="/terms"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="/policy"
          >
            Privacy
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="/form/contact-us"
          >
            Contact
          </Link>
        </nav>
      </footer>
    </>
  )
}
