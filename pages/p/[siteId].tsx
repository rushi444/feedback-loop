import { useState } from 'react'
import { Box, Button } from '@chakra-ui/react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { InputField } from '@components/fields/InputField'
import { useAuth } from '@lib/auth'
import { createFeedback } from '@lib/db'
import { getAllFeedback, getAllSites } from '@lib/db-admin'
import { Feedback } from '@containers/SiteFeedback/Feedback'
import { TFeedback } from 'utils/types'

type Props = {
  initialFeedback: TFeedback[]
}

const SiteFeedback = ({ initialFeedback }: Props) => {
  const { user } = useAuth()
  const { query } = useRouter()
  const [allFeedback, setAllFeedback] = useState<TFeedback[]>(initialFeedback)
  const { control, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      comment: ''
    }
  })

  const onSubmit = (formValues: FormValues) => {
    const newFeedback: TFeedback = {
      author: user.name,
      authorId: user.uid,
      siteId: query.siteId,
      text: formValues.comment,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: 'pending'
    }
    createFeedback(newFeedback)
    setAllFeedback([newFeedback, ...allFeedback])
    reset()
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
    >
      <Box as="form" onSubmit={handleSubmit(onSubmit)} mb="2rem">
        <InputField name="comment" label="Comment" control={control} />
        <Button type="submit" fontWeight="medium">
          Add Comment
        </Button>
      </Box>

      {allFeedback?.map((feedback: TFeedback) => (
        <Feedback key={feedback.id} {...feedback} />
      ))}
    </Box>
  )
}

type FormValues = {
  comment: string
}

export const getStaticProps: GetStaticProps = async context => {
  const { siteId } = context.params
  const { feedback } = await getAllFeedback(siteId as string)
  return {
    props: {
      initialFeedback: feedback
    },
    revalidate: 1
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
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

export default SiteFeedback
