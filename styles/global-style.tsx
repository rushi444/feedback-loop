import { CSSReset } from '@chakra-ui/react'
import { Global, css } from '@emotion/react'

export const GlobalStyle = () => {
  return (
    <>
      <CSSReset />
      <Global
        styles={css`
          html {
            min-width: 360px;
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
    </>
  )
}
