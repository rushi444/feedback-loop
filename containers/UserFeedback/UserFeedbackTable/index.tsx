import { Box, Code, Switch, IconButton } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

import { Table, Tr, Th, Td } from '@containers/Dashboard/SiteTable/Table'
import { TFeedback } from 'utils/types'
import { DeleteFeedbackButton } from '../DeleteFeedbackButton'

export const UserFeedbackTable = ({ allFeedback }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Visible</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {allFeedback.map((feedback: TFeedback) => (
          <Box as="tr" key={feedback.id}>
            <Td fontWeight="medium">{feedback.author}</Td>
            <Td>{feedback.text}</Td>
            <Td>
              <Code>{'/'}</Code>
            </Td>
            <Td>
              <Switch
                colorScheme="green"
                defaultChecked={feedback.status === 'active'}
              />
            </Td>
            <Td>
              <DeleteFeedbackButton feedbackId={feedback.id} />
            </Td>
          </Box>
        ))}
      </tbody>
    </Table>
  )
}
