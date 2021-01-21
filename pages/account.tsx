import useSWR from 'swr'

import { useAuth } from '@lib/auth'
import { DashboardShell } from '@containers/Dashboard/DashboardShell'
import { fetcher } from '@utils/fetcher'
import { createCheckoutSession, goToBillingPortal } from '@lib/db'
import { Box, Button } from '@chakra-ui/react'

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
      <Box>
        <Button
          onClick={e => createCheckoutSession(user.uid)}
          backgroundColor="gray.900"
          color="white"
          fontWeight="medium"
          _hover={{ bg: 'gray.700' }}
          _active={{
            bg: 'gray.800',
            transform: 'scale(0.95)'
          }}
        >
          Upgrade to Starter
        </Button>
        <Button
          onClick={e => goToBillingPortal()}
          backgroundColor="gray.900"
          color="white"
          fontWeight="medium"
          ml={4}
          _hover={{ bg: 'gray.700' }}
          _active={{
            bg: 'gray.800',
            transform: 'scale(0.95)'
          }}
        >
          Go to Billing Portal
        </Button>
      </Box>
    </DashboardShell>
  )
}

export default Dashboard
