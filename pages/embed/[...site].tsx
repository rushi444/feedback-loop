import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import 'iframe-resizer/js/iframeResizer.contentWindow'

import { getAllFeedback, getAllSites, getSite } from '@lib/db-admin'
import { FeedbackLink } from '@containers/SiteFeedback/FeedbackLink'
import { Feedback } from '@containers/SiteFeedback/Feedback'

export const getStaticProps: GetStaticProps = async context => {
  const [siteId, route] = context.params.site as any
  const { feedback } = await getAllFeedback(siteId, route)
  const { site } = await getSite(siteId)

  return {
    props: {
      initialFeedback: feedback,
      site
    },
    revalidate: 1
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { sites } = await getAllSites()
  const paths = sites.map(site => ({
    params: {
      site: [site.id.toString()]
    }
  }))
  return {
    paths,
    fallback: true
  }
}

const EmbeddedFeedbackPage = ({ initialFeedback, site }) => {
  const router = useRouter()

  return (
    <Box display="flex" flexDirection="column" width="full">
      <FeedbackLink paths={router.query.site} />
      {initialFeedback?.length ? (
        initialFeedback.map((feedback, index) => {
          return (
            <Feedback
              key={feedback.id}
              settings={site?.settings}
              isLast={index === initialFeedback.length - 1}
              feedback={feedback}
            />
          )
        })
      ) : (
        <Box>There are no comments for this site.</Box>
      )}
    </Box>
  )
}

export default EmbeddedFeedbackPage
