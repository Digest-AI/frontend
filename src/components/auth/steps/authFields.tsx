'use client'

import { useAuthContext } from '@/providers';
import { EmailField, PasswordField, RememberMeField } from '@/components/fields';
import { AuthButton } from '../buttons';
import { useAuthField } from '@/hooks';
import { useCallback } from 'react';

export function AuthFields() {
  const { state, setState, submit, activeType, setActiveType } = useAuthContext()
  const [emailValue, emailError, handleEmailChange] = useAuthField('email')
  const [passwordValue, passwordError, handlePasswordChange] = useAuthField('password')

  const switchType = useCallback((field: 'email' | 'password') => {
    if (activeType === 'login' || activeType === 'restore') {
      if (field === 'email') {
        return setActiveType('signup')
      }
      return setActiveType('restore')
    }
    setActiveType('login')
  }, [activeType, setActiveType]);

  const comparePasswords = useCallback((password2: string) => {
    if (password2 === passwordValue) {
      if (state.password.error === 'password_mismatch') {
        setState({...state, password: {...state.password, error: ''}})
      }
    } else {
      if (state.password.error === '') {
        setState({...state, password: {...state.password, error: 'password_mismatch'}})
      }
    }
  }, [passwordValue, setState, state])
  
  return <>
    <EmailField
      value={emailValue}
      error={state.email.error ?? emailError}
      onChange={handleEmailChange}
      name='email'
      activeType={activeType}
      switchType={switchType}
    />
    <PasswordField
      value={passwordValue}
      error={state.password.error ?? passwordError}
      onChange={handlePasswordChange}
      activeType={activeType}
      switchType={activeType === 'login' ? switchType : undefined}
      comparePasswords={activeType === 'login' ? undefined : comparePasswords}
    />
    <RememberMeField value={state.rememberMe} onChange={checked => setState({...state, rememberMe: checked})} />
    <AuthButton type={activeType} onClick={submit} />
  </>
}