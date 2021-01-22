import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'

import { getAllFeedback, getAllSites } from '@lib/db-admin'
import { FeedbackLink } from '@containers/SiteFeedback/FeedbackLink'
import { Feedback } from '@containers/SiteFeedback/Feedback'

export async function getStaticProps(context) {
  const siteId = context.params.siteId
  const { feedback } = await getAllFeedback(siteId)

  return {
    props: {
      initialFeedback: feedback
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const { sites } = await getAllSites()
  const paths = sites.map(site => ({
    params: {
      siteId: site.id.toString()
    }
  }))

  return {
    paths,
    fallback: true
  }
}

const EmbeddedFeedbackPage = ({ initialFeedback }) => {
  const router = useRouter()

  return (
    <Box display="flex" flexDirection="column" width="full">
      <FeedbackLink siteId={router.query.siteId} />
      {initialFeedback &&
        initialFeedback.map(feedback => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
    </Box>
  )
}

export default EmbeddedFeedbackPage
