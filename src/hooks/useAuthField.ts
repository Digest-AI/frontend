'use client'

import type { AuthFormState } from '@/app/actions';
import { useAuthContext } from '@/providers';
import { validateEmail, validatePassword } from '@/utils/fieldValidators';
import { useCallback, useState, useEffect, useMemo } from 'react';

const DEBOUNCE_MS = 300 // Debounce validation by 300ms

export function useAuthField(field: 'email' | 'password'): [string, string, (value: string) => void] {
  const { state, setState } = useAuthContext()
  const [localField, setLocalField] = useState<AuthFormState[typeof field]>({
    value: state[field].value,
    error: state[field].error
  })
  const localValue = useMemo(() => localField.value, [localField.value])
  const localError = useMemo(() => localField.error, [localField.error])
  const currentType = useMemo(() => state.type, [state.type])
  
  //debouncing values to not validate the field until the user stops typing (DEBOUNCE_MS)
  const [debouncedField, setDebouncedField] = useState({...localField})

  const applyValidation = useMemo(() => {
    switch (currentType) {
      case 'login':
        return false
      case 'signup':
        return true
      case 'restore':
        return field === 'password'
    }
  }, [currentType, field])

  // Validate with debouncing
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedField(localField)
    }, DEBOUNCE_MS)

    return () => clearTimeout(timeout)
  }, [localField])

  useEffect(() => {
    setState(state => ({...state, [field]: debouncedField}))
  }, [field, debouncedField, setState])

  // Immediate update for input value (no lag)
  const handleChange = useCallback((value: string) => {
    if (applyValidation) {
      let error = ''
      if (field === 'email') {
        error = validateEmail(value)
      } else if (field === 'password') {
        error = validatePassword(value)
      }
      setLocalField({ value, error })
    }
    setLocalField(prev => ({...prev, value}))
  }, [applyValidation, field])

  return [localValue, localError, handleChange]
}