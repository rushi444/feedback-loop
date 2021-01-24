import { Box, Link } from '@chakra-ui/react'
import { parseISO, format } from 'date-fns'
import NextLink from 'next/link'

import { Table, Tr, Th, Td } from '@containers/Dashboard/SiteTable/Table'
import { TSite } from 'utils/types'
import { DeleteSitebutton } from './DeleteSiteButton'

export const SiteTable = ({ sites }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {sites.map((site: TSite) => (
          <Box as="tr" key={site.url}>
            <Td>
              <NextLink href="/site/[siteId]" as={`/site/${site.id}`} passHref>
                <Link fontWeight="medium">{site.name}</Link>
              </NextLink>
            </Td>
            <Td>{site.url}</Td>
            <Td>
              <NextLink href="/site/[siteId]" as={`/site/${site.id}`} passHref>
                <Link color="blue.500" fontWeight="medium">
                  View Feedback
                </Link>
              </NextLink>
            </Td>
            <Td>{format(parseISO(site.createdAt), 'PPpp')}</Td>
            <Td>
            <DeleteSitebutton siteId={site.id} />
            </Td>
          </Box>
        ))}
      </tbody>
    </Table>
  )
}
