import { AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import { SWRConfig } from 'swr'

import { theme } from '@styles/theme'
import { AuthProvider } from '@lib/auth'
import { GlobalStyle } from '@styles/global-style'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <SWRConfig
        value={{
          refreshInterval:
            process.env.NODE_ENV === 'production' ? 3000 : 1000000
        }}
      >
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>{' '}
      </SWRConfig>
    </ThemeProvider>
  )
}

export default MyApp
