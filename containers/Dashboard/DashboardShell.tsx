import { Box, Button, Flex, Link, Avatar } from '@chakra-ui/react'
import { LogoIcon } from '@components/Icons/LogoIcon'
import NextLink from 'next/link'

import { useAuth } from '@lib/auth'

export const DashboardShell = ({ children }) => {
  const { user, signOut } = useAuth()

  return (
    <Box backgroundColor="gray.100" h="100vh">
      <Flex backgroundColor="white" mb={16} w="full">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          pt={4}
          pb={4}
          maxW="1250px"
          margin="0 auto"
          w="full"
          px={8}
        >
          <Flex>
            <NextLink href="/" passHref>
              <Link>
                <LogoIcon boxSize={8} mr={8} />
              </Link>
            </NextLink>
            <NextLink href="/dashboard" passHref>
              <Link mr={4}>Sites</Link>
            </NextLink>
            <NextLink href="/feedback" passHref>
              <Link>Feedback</Link>
            </NextLink>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            {user && (
              <NextLink href="/" passHref>
                <Link>
                  <Button variant="ghost" mr={2} onClick={() => signOut()}>
                    Log Out
                  </Button>
                </Link>
              </NextLink>
            )}
            <Avatar size="sm" src={user?.photoURL} />
          </Flex>
        </Flex>
      </Flex>
      <Flex margin="0 auto" direction="column" maxW="1250px" px={8}>
        {children}
      </Flex>
    </Box>
  )
}
