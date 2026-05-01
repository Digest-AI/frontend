'use client'

import { CodeField } from '@/components/fields'
import { useAuthContext } from '@/providers'

export function Verification() {
  const { state, setState, submit } = useAuthContext()

  return <CodeField
    value={state.code.value}
    error={state.code.error}
    onChange={(value, error) => setState(prev => ({...prev, code: { ...prev.code, value, error }}))}
    submit={submit}
    resend={() => submit('login')}
  />
}