import { AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'

import { theme } from '@styles/theme'
import { AuthProvider } from '@lib/auth'
import { GlobalStyle } from '@styles/global-style'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default MyApp
