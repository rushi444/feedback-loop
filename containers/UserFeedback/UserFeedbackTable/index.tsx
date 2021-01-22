import { Table, Tr, Th } from '@containers/Dashboard/SiteTable/Table'
import { TFeedback } from 'utils/types'
import { FeedbackRow } from './FeedbackRow'

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
          <FeedbackRow key={feedback.id} feedback={feedback} />
        ))}
      </tbody>
    </Table>
  )
}
