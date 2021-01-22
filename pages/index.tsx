import Head from 'next/head'
import { Box, Flex, Text } from '@chakra-ui/react'
import { GetStaticProps } from 'next'

import { LogoIcon } from '@components/Icons/LogoIcon'
import { AuthButtons } from '@components/AuthButtons'
import { getAllFeedback } from '@lib/db-admin'
import { FeedbackLink } from '@containers/SiteFeedback/FeedbackLink'
import { Feedback } from '@containers/SiteFeedback/Feedback'

const SITE_ID = 'K27L1fcuebu9l5HR9aTm'

const Home = ({ allFeedback }) => {
  return (
    <>
      <Box bg="gray.100" py={16}>
        <Flex as="main" direction="column" maxW="700px" margin="0 auto">
          <Head>
            <script
              dangerouslySetInnerHTML={{
                __html: `if (document.cookie && document.cookie.includes('feedback-loop-auth')) {
                      window.location.href = "/sites"
                    }
                  `
              }}
            />
            <title>Feedback Loop</title>
          </Head>
          <LogoIcon boxSize={16} mb={4} />
          <Text mb={4} fontSize="lg" py={4}>
            <Text as="span" fontWeight="bold" display="inline">
              Feedback Loop
            </Text>
            {` is the easiest way to add comments or reviews to your website, with just one line of code. It's still a work-in-progress, but you can try it out by logging in.`}
          </Text>
          <AuthButtons />
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
        <FeedbackLink siteId={SITE_ID} />
        {allFeedback.map(feedback => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
      </Box>
    </>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const { feedback } = await getAllFeedback(SITE_ID)
  return {
    props: {
      allFeedback: feedback
    },
    revalidate: 1
  }
}

export default Home
