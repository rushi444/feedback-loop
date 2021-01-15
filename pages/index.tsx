import Head from 'next/head'
import { Button,  Flex } from '@chakra-ui/react'

import { useAuth } from '@lib/auth'
import { LogoIcon } from '@styles/Icons/LogoIcon'

export default function Home() {
  const auth = useAuth()

  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
    >
      <Head>
        <title>Feedback Loop</title>
      </Head>
      <LogoIcon boxSize={16} />
      {auth.user ? (
        <Button onClick={() => auth.signOut()}>Sign Out</Button>
      ) : (
        <Button
          mt={4}
          size="sm"
          onClick={() => auth.signInWithGitHub()}
        >
          Sign In
        </Button>
      )}
    </Flex>
  )
}
