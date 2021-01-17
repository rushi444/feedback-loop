import useSWR from 'swr'

import { useAuth } from '@lib/auth'
import { DashboardShell } from '@containers/Dashboard/DashboardShell'
import { SiteTableSkeleton } from '@containers/Dashboard/SiteTable/TableSkeleton'
import { SiteTable } from '@containers/Dashboard/SiteTable'
import { EmptyState } from '@containers/Dashboard/EmptyState'
import { fetcher } from 'utils/fetcher'

const Dashboard = () => {
  const auth = useAuth()
  const { data } = useSWR('/api/sites', fetcher)

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      {data?.sites?.length ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  )
}

export default Dashboard
