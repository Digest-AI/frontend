'use client'

import { useCallback, useMemo, useState } from "react"
import { Input } from "./inputs"

interface Password2Props {
  password: string
  masked: boolean
  comparePasswords: (password2: string) => void
}

export function Password2({password, masked, comparePasswords}: Password2Props) {
  const [password2, setPassword2] = useState('')

  const error = useMemo(() => password !== password2 ? 'password_mismatch' : '', [password, password2])

  const handleChange = useCallback((value: string) => {
    setPassword2(value)
    comparePasswords(value)
  }, [comparePasswords])

  return <Input
    error={error !== ''}
    helperText={error}
    type={masked ? 'password' : 'text'}
    name='password2'
    value={password2}
    onChange={e => handleChange(e.target.value)}
  />
}