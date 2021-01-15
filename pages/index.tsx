import Head from 'next/head'
import { Button, Flex } from '@chakra-ui/react'

import { useAuth } from '@lib/auth'
import { LogoIcon } from '@components/Icons/LogoIcon'

const Home = () => {
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

      <LogoIcon boxSize={16} mb={4} />
      {auth.user ? (
        <Button as="a" href="/dashboard">
          View Dashboard
        </Button>
      ) : (
        <Button mt={4} size="sm" onClick={() => auth.signInWithGitHub()}>
          Sign In
        </Button>
      )}
    </Flex>
  )
}

export default Home
