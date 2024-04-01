'use client'

import { useRef, useState } from 'react'
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
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const callbackUrl = searchParams.get('callbackUrl') as string
  const formRef = useRef<HTMLFormElement>(null)
  return (
    <form
      ref={formRef}
      onSubmit={async (e) => {
        e.preventDefault()
        setLoading(true)
        await signIn('email', {
          email,
          callbackUrl: callbackUrl || `/app`,
        })
        formRef.current?.reset()
        setLoading(false)
      }}
    >
      <Input
        name={'email'}
        label={'Email'}
        type={'email'}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={'Email'}
        disabled={loading}
      />
      <Button
        type="submit"
        loading={loading}
        loadingText="Sending email..."
        className="w-full"
      >
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
