import { Button, Stack } from '@chakra-ui/react'
import { GithubIcon } from '@components/Icons/GithubIcon'
import { GoogleIcon } from '@components/Icons/GoogleIcon'

import { useAuth } from '@lib/auth'

export const AuthButtons = () => {
  const auth = useAuth()
  return (
    <>
      {auth.user ? (
        <Button
          as="a"
          href="/sites"
          backgroundColor="gray.900"
          color="white"
          fontWeight="medium"
          mt={4}
          maxW="200px"
          _hover={{ bg: 'gray.700' }}
          _active={{
            bg: 'gray.800',
            transform: 'scale(0.95)'
          }}
        >
          View Dashboard
        </Button>
      ) : (
        <Stack isInline>
          <Button
            onClick={e => auth.signInWithGitHub()}
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            leftIcon={<GithubIcon />}
            _hover={{ bg: 'gray.700' }}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)'
            }}
          >
            Sign In with GitHub
          </Button>
          <Button
            onClick={e => auth.signInWithGoogle()}
            backgroundColor="white"
            color="gray.900"
            variant="outline"
            fontWeight="medium"
            leftIcon={<GoogleIcon />}
            _hover={{ bg: 'gray.100' }}
            _active={{
              bg: 'gray.100',
              transform: 'scale(0.95)'
            }}
          >
            Sign In with Google
          </Button>
        </Stack>
      )}
    </>
  )
}
