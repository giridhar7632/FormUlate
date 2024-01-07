import Image from 'next/image'
import { EmailLogin, GitHubLogin, GoogleLogin } from '../Methods'

export default async function Page() {
  return (
    <>
      <Image
        className="mx-auto"
        width={72}
        height={72}
        src="/logo.png"
        alt="FormUlate Logo"
      />
      <h1 className="my-6 text-center">Welcome to FormUIate</h1>
      <EmailLogin />
      <div className="my-6">
        <p className="text-gray-400 text-center">- Or -</p>
        <div className="flex items-center gap-4 pt-4">
          <GoogleLogin />
          <GitHubLogin />
        </div>
      </div>
    </>
  )
}
