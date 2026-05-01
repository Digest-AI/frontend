'use client'

//mui components
import Box from "@mui/material/Box"
import Stack, { type StackOwnProps } from "@mui/material/Stack"
import CircularProgress from "@mui/material/CircularProgress"

interface WithLoaderProps extends StackOwnProps {
  loading: boolean
  children: React.ReactNode | React.ReactNode[]
}

export function WithLoader({loading, children, ...props}: WithLoaderProps) {
  return <Box sx={{position: 'relative', width: '100%', height: '100%'}}>
    <Stack {...props} sx={{...props.sx, opacity: loading ? 0.2 : 1, transition: '0.35s'}}>
      {children}
    </Stack>
    <Stack direction='row' sx={{
      zIndex: loading ? 1000 : -1,
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: loading ? 1 : 0,
      transition: '0.35s'
    }}>
      {loading && <CircularProgress size='30vh' />}
    </Stack>
  </Box>
}