'use client'

import { useRef } from 'react'
import { useFormStatus } from 'react-dom'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Provider from '@/components/Providers'
import { signIn, signOut } from 'next-auth/react'

export const SignOut: React.FC = () => (
  <Button variant="secondary" onClick={() => signOut({ callbackUrl: '/' })}>
    Sign out
  </Button>
)

export const EmailLogin: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const { pending } = useFormStatus()
  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await signIn('email', {
          email: formData.get('email'),
          callbackUrl: `/app`,
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

export const GoogleLogin: React.FC = () => (
  <Button
    className="flex-1"
    variant="gray"
    onClick={() => {
      signIn('google', {
        callbackUrl: `/app`,
      })
    }}
  >
    <Provider id={'google'} /> Google
  </Button>
)

export const GitHubLogin: React.FC = () => (
  <Button
    className="flex-1"
    variant="gray"
    onClick={() => {
      signIn('github', {
        callbackUrl: `/app`,
      })
    }}
  >
    <Provider id={'github'} /> GitHub
  </Button>
)
