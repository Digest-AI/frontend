'use client'

import { useState } from 'react';
import { Input } from './inputs';
import { Password2 } from './password2';

//mui components
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
//icons
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import VisibilityIcon from "@mui/icons-material/Visibility"
import Collapse from '@mui/material/Collapse';

type PasswordFieldProps = {
  value: string
  error: string
  onChange: (value: string) => void
  activeType?: string
  switchType?: (field: 'email' | 'password') => void
  comparePasswords?: (password2: string) => void
}

export function PasswordField({value, error, onChange, activeType, switchType, comparePasswords}: PasswordFieldProps) {
  const [masked, setMasked] = useState(true)

  return <>
    <Input
      error={error !== ''}
      helperText={error}
      type={masked ? 'password' : 'text'}
      name='password'
      value={value}
      activeType={activeType}
      onChange={e => onChange(e.target.value)}
      switchType={switchType}
      slotProps={{
        input: {
          endAdornment: <InputAdornment position='end' sx={{mr: 1}}>
            <IconButton 
              aria-label={masked ? 'hide' : 'display'} 
              onClick={() => setMasked(!masked)}  
              edge='end'
              sx={{
                cursor: 'pointer',
                minWidth: {xs: '48px', md: 'auto'},
                minHeight: {xs: '48px', md: 'auto'},
                '& .MuiSvgIcon-root': {
                  fontSize: {xs: '1.5rem', md: 'inherit'}
                }
              }}
            >
              {masked ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        }
      }}
    />
    {activeType !== undefined && <Collapse in={comparePasswords !== undefined} timeout={2000}>
      <Password2 password={value} masked={masked} comparePasswords={comparePasswords ?? (() => {})} />
    </Collapse>}
  </>
}