'use client'

import { useRef } from 'react'
import { useFormStatus } from 'react-dom'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Provider from '@/components/Providers'
import { signIn, signOut } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export const SignOut: React.FC = () => (
  <Button variant="secondary" onClick={() => signOut({ callbackUrl: '/' })}>
    Sign out
  </Button>
)

export const EmailLogin = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') as string
  const formRef = useRef<HTMLFormElement>(null)
  const { pending } = useFormStatus()
  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await signIn('email', {
          email: formData.get('email'),
          callbackUrl: callbackUrl || `/app`,
        })
        formRef.current?.reset()
      }}
    >
      <Input
        name={'email'}
        label={'Email'}
        type={'email'}
        placeholder={'Email'}
        disabled={pending}
      />
      <Button type="submit" disabled={pending} className="w-full">
        Continue with Email
      </Button>
    </form>
  )
}

type SocialLoginProps = {
  type: 'Google' | 'GitHub'
}

export const SocialLogin = ({ type }: SocialLoginProps) => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') as string
  return (
    <Button
      className="flex-1"
      variant="outline"
      onClick={() => {
        signIn(type.toLowerCase(), {
          callbackUrl: callbackUrl || `/app`,
        })
      }}
    >
      <Provider id={type} /> {type}
    </Button>
  )
}
