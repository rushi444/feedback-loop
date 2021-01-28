import { Box, Heading, Text, Divider, Flex } from '@chakra-ui/react'
import { getLogo } from '@utils/getLogo'
import { TFeedback } from '@utils/types'
import { format, parseISO } from 'date-fns'

type Props = {
  feedback: TFeedback
  settings?: any
  isLast?: boolean
}

export const Feedback = ({ feedback, settings, isLast }: Props) => {
  const { author, text, createdAt, provider } = feedback

  return (
    <Box borderRadius={4} maxWidth="700px" w="full">
      <Flex align="center">
        <Heading size="sm" as="h3" mb={0} color="gray.900" fontWeight="medium">
          {author}
        </Heading>
        {settings?.icons && getLogo(provider)}
      </Flex>
      {settings?.timestamp && (
        <Text color="gray.500" mb={4} fontSize="xs">
          {format(parseISO(createdAt), 'PPpp')}
        </Text>
      )}
      <Text color="gray.800">{text}</Text>
      {!isLast && (
        <Divider
          borderColor="gray.200"
          backgroundColor="gray.200"
          mt={6}
          mb={6}
        />
      )}
    </Box>
  )
}

