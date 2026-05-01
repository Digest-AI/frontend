'use client'

import { Toggle } from './inputs';

type RememberMeFieldProps = {
  value: boolean
  onChange: (value: boolean) => void
}

export function RememberMeField({value, onChange}: RememberMeFieldProps) {
  return <Toggle checked={value} onChange={e => onChange(e.target.checked)} />
}