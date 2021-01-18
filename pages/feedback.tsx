import useSWR from 'swr'

import { useAuth } from '@lib/auth'
import { fetcher } from '@utils/fetcher'
import { DashboardShell } from '@containers/Dashboard/DashboardShell'
import { UserFeedbackTable } from '@containers/UserFeedback/UserFeedbackTable'
import { UserFeedbackTableHeader } from '@containers/UserFeedback/UserFeedbackTable/UserFeedbackTableHeader'
import { UserFeedbackSkeleton } from '@containers/UserFeedback/UserFeedbackTable/UserFeedbackSkeleton'
import { EmptyState } from '@containers/Dashboard/EmptyState'

const MyFeedback = () => {
  const { user } = useAuth()
  const { data } = useSWR(user ? ['/api/feedback', user.token] : null, fetcher)

  if (!data) {
    return (
      <DashboardShell>
        <UserFeedbackTableHeader />
        <UserFeedbackSkeleton />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <UserFeedbackTableHeader />
      {data.allFeedback.length ? (
        <UserFeedbackTable allFeedback={data.allFeedback} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  )
}

export default MyFeedback
