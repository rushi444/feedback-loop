import useSWR from 'swr'

import { useAuth } from '@lib/auth'
import { DashboardShell } from '@containers/Dashboard/DashboardShell'
import { SiteTableSkeleton } from '@containers/Dashboard/SiteTable/TableSkeleton'
import { SiteTable } from '@containers/Dashboard/SiteTable'
import { EmptyState } from '@containers/Dashboard/EmptyState'
import { fetcher } from '@utils/fetcher'
import { TableHeader as SiteTableHeader } from '@containers/Dashboard/SiteTable/TableHeader'

const Dashboard = () => {
  const { user } = useAuth()
  const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher)

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <SiteTableHeader />
      {data?.sites?.length ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  )
}

export default Dashboard
