'use client'

import { Input } from './inputs';

type EmailFieldProps = {
  value: string
  error: string
  onChange: (value: string) => void
  name: 'email' | 'backup_email'
  activeType?: string
  switchType?: (field: 'email' | 'password') => void
}

export function EmailField({value, error, onChange, name, activeType, switchType}: EmailFieldProps) {
  return <Input
    autoFocus
    error={error !== ''}
    helperText={error}
    type='email'
    name={name}
    value={value}
    onChange={e => onChange(e.target.value)}
    activeType={activeType}
    switchType={switchType}
  />
}