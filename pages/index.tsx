import Head from 'next/head'
import { Box, Button, Flex, Text, Icon, Link, Stack } from '@chakra-ui/react'

import { useAuth } from '@lib/auth'
import { getAllFeedback, getSite } from '@lib/db-admin'
import { AuthButtons } from '@components/AuthButtons'
import { FeedbackLink } from '@containers/SiteFeedback/FeedbackLink'
import { Feedback } from '@containers/SiteFeedback/Feedback'
import { LogoIcon } from '@components/Icons/LogoIcon'

const SITE_ID = 'SYESdKNdIwVXfggj6S9I'

export async function getStaticProps(context) {
  const { feedback } = await getAllFeedback(SITE_ID)
  const { site } = await getSite(SITE_ID)

  return {
    props: {
      allFeedback: feedback,
      site
    },
    revalidate: 1
  }
}

const Home = ({ allFeedback, site }) => {
  const auth = useAuth()

  return (
    <>
      <Box bg="gray.100" py={16}>
        <Flex as="main" direction="column" maxW="700px" margin="0 auto">
          <Head>
            <script
              dangerouslySetInnerHTML={{
                __html: `
              if (document.cookie && document.cookie.includes('feedback-loop-auth')) {
                window.location.href = "/sites"
              }
            `
              }}
            />
          </Head>
          <LogoIcon boxSize={16} />
          <Text mb={4} fontSize="lg" py={4}>
            <Text as="span" fontWeight="bold" display="inline">
              Feedback Loop
            </Text>{' '}
            is the easiest way to add comments or reviews to your static site.
            It's still a work-in-progress, but you can try it out by logging in.
          </Text>
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
            <AuthButtons />
          )}
        </Flex>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        width="full"
        maxWidth="700px"
        margin="0 auto"
        mt={8}
      >
        <FeedbackLink paths={[SITE_ID]} />
        {allFeedback.map((feedback, index) => (
          <Feedback
            key={feedback.id}
            settings={site?.settings}
            isLast={index === allFeedback.length - 1}
            feedback={feedback}
          />
        ))}
      </Box>
    </>
  )
}

export default Home
