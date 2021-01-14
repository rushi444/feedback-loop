import Head from 'next/head'
import { Button, Code, Heading, Text } from '@chakra-ui/react'

import { useAuth } from '@lib/auth'

export default function Home() {
  const auth = useAuth()
  
  return (
    <div>
      <Head>
        <title>Feedback Loop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading>
          Welcome to <a href="https://nextjs.org">Feedback Loop</a>
        </Heading>

        <Text>
          Current User: <Code>{auth?.user?.email || 'None'}</Code>
        </Text>
        {auth.user ? (
          <Button onClick={() => auth.signOut()}>Sign Out</Button>
        ) : (
          <Button onClick={() => auth.signInWithGitHub()}>Sign In</Button>
        )}
      </main>
    </div>
  )
}
