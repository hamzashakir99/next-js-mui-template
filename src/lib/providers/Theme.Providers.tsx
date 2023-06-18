'use client'

/* Core */
import { PropsWithChildren, useMemo } from 'react'
import { useSelector } from 'react-redux'

/* Instruments */
import { getDesignTokens } from '@/theme/themes'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider, CssBaseline } from '@mui/material'

const Providers = (props: PropsWithChildren) => {
  const themeSlice = useSelector((state: any) => state.themeSlice)
  const theme = useMemo(
    () => createTheme(getDesignTokens(themeSlice.mode)),
    [themeSlice.mode]
  )
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  )
}

export default Providers
