import Head from 'next/head'
import { Box, Button, Flex, Text } from '@chakra-ui/react'

import { useAuth } from '@lib/auth'
import { LogoIcon } from '@components/Icons/LogoIcon'
import { AuthButtons } from '@containers/Home/AuthButtons'

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
      <Box w={{ base: '90%', md: '50%', lg: '40%' }} mb="1.5rem">
        <Text as="span" fontWeight="medium">
          Feedback Loop
        </Text>{' '}
        is the easiest way to add comments or reviews to your website. It's
        still a work in progress, but you can try it out by logging in.
      </Box>
      {auth.user ? (
        <Button as="a" href="/dashboard">
          View Dashboard
        </Button>
      ) : (
        <AuthButtons />
      )}
    </Flex>
  )
}

export default Home
