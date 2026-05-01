'use client'

import { AuthFormState } from "@/app/actions"
import { createContext, Dispatch, SetStateAction, useContext } from "react"

export type AuthContextType = {
  activeType: AuthFormState['type']
  setActiveType: (type: AuthFormState['type']) => void
  state: AuthFormState
  setState: Dispatch<SetStateAction<AuthFormState>>
  submit: (type?: AuthFormState['type']) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const useAuthContext = () => useContext(AuthContext)!