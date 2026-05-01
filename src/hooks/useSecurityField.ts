'use client'

import { validateEmail, validatePassword } from '@/utils/fieldValidators';
import { useCallback, useState, useEffect, useMemo } from 'react';

const DEBOUNCE_MS = 300 // Debounce validation by 300ms

export function useSecurityField<T extends string | null = string>(
  field: 'email' | 'backupEmail' | 'password',
  value: T,
  error: string,
  onChange: (value: T, error: string) => void
): [T, string, (value: T) => void] {
  const [localField, setLocalField] = useState<{ value: T, error: string }>({
    value: value,
    error: error
  })
  const localValue = useMemo(() => localField.value, [localField.value])
  const localError = useMemo(() => localField.error, [localField.error])
  
  //debouncing values to not validate the field until the user stops typing (DEBOUNCE_MS)
  const [debouncedField, setDebouncedField] = useState({...localField})

  // Validate with debouncing
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedField(localField)
    }, DEBOUNCE_MS)

    return () => clearTimeout(timeout)
  }, [localField])

  useEffect(() => {
    onChange(debouncedField.value, debouncedField.error)
  }, [field, debouncedField, onChange])

  // Immediate update for input value (no lag)
  const handleChange = useCallback((value: T) => {
    let error = ''
    if (field === 'email') {
      error = validateEmail(value as string)
    } else if (field === 'backupEmail') {
      if (value === '') {
        setLocalField({ value: null as T, error: '' })
        return
      }
      error = validateEmail(value as string)
    } else if (field === 'password') {
      error = validatePassword(value as string)
    }
    setLocalField({ value, error })
  }, [field])

  return [localValue, localError, handleChange]
}