import { Box, Code, Switch } from '@chakra-ui/react'
import { mutate } from 'swr'

import { TFeedback } from '@utils/types'
import { Td } from '@containers/Dashboard/SiteTable/Table'
import { DeleteFeedbackButton } from '../DeleteFeedbackButton'
import { useState } from 'react'
import { updateFeedback } from '@lib/db'
import { useAuth } from '@lib/auth'

type Props = {
  feedback: TFeedback
}

export const FeedbackRow = ({ feedback }: Props) => {
  const { user } = useAuth()

  const isChecked: boolean = feedback.status === 'active'

  const toggleFeedback = async () => {
    await updateFeedback(feedback.id, {
      status: isChecked ? 'pending' : 'active'
    })
    mutate(['/api/feedback', user.token])
  }

  return (
    <Box as="tr" key={feedback.id}>
      <Td fontWeight="medium">{feedback.author}</Td>
      <Td>{feedback.text}</Td>
      <Td>
        <Code>{'/'}</Code>
      </Td>
      <Td>
        <Switch
          colorScheme="green"
          onChange={toggleFeedback}
          isChecked={isChecked}
        />
      </Td>
      <Td>
        <DeleteFeedbackButton feedbackId={feedback.id} />
      </Td>
    </Box>
  )
}
