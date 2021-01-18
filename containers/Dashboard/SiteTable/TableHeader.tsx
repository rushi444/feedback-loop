import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading
} from '@chakra-ui/react'

import { AddSiteModal } from '../AddSiteModal'

export const TableHeader = () => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink>Sites</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justifyContent="space-between">
        <Heading mb={8}>My Sites</Heading>
        <AddSiteModal>+ Add Site</AddSiteModal>
      </Flex>
    </>
  )
}
