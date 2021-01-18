import { Button, Stack } from '@chakra-ui/react'
import { GithubIcon } from '@components/Icons/GithubIcon'
import { GoogleIcon } from '@components/Icons/GoogleIcon'

import { useAuth } from '@lib/auth'

export const AuthButtons = () => {
  const auth = useAuth()
  return (
    <Stack>
      <Button
        onClick={() => auth.signInWithGitHub()}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)'
        }}
        size="lg"
        leftIcon={<GithubIcon />}
      >
        Sign In with Github
      </Button>
      <Button
        onClick={() => auth.signInWithGoogle()}
        backgroundColor="white"
        color="gray.900"
        variant="outline"
        fontWeight="medium"
        _hover={{ bg: 'gray.100' }}
        _active={{
          bg: 'gray.100',
          transform: 'scale(0.95)'
        }}
        size="lg"
        leftIcon={<GoogleIcon />}
      >
        Sign In with Google
      </Button>
    </Stack>
  )
}
