import Head from 'next/head'
import { Box, Button, Flex } from '@chakra-ui/react'

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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (document.cookie && document.cookie.includes('feedback-loop-auth')) {
                window.location.href = "/dashboard"
              }
            `
          }}
        />
        <title>Feedback Loop</title>
      </Head>

      <LogoIcon boxSize={16} mb={4} />
      <Box w="md" mb="1.5rem">
        Feedback Loop is the easiest way to add comments or reviews to your
        website. It's still a work in progress, but you can try it out by
        logging in.
      </Box>
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
