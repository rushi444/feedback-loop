import useSWR from 'swr'

import { useAuth } from '@lib/auth'
import { DashboardShell } from '@containers/Dashboard/DashboardShell'
import { fetcher } from '@utils/fetcher'
// import { createCheckoutSession } from '@lib/db'
import { GithubIcon } from '@components/Icons/GithubIcon'
import { Button } from '@chakra-ui/react'

const Dashboard = () => {
  const { user } = useAuth()
  //   const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher)

  //   if (!data) {
  //     return (
  //       <DashboardShell>
  //         <SiteTableHeader />
  //         <SiteTableSkeleton />
  //       </DashboardShell>
  //     )
  //   }

  return (
    <DashboardShell>
      <Button
        // onClick={e => createCheckoutSession(user.uid)}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        leftIcon={<GithubIcon />}
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)'
        }}
      >
        Upgrade to Starter
      </Button>
    </DashboardShell>
  )
}

export default Dashboard
