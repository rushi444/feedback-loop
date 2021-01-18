import { useState, useRef } from 'react'
import { mutate } from 'swr'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  Button
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

import { deleteFeedback } from '@lib/db'
import { useAuth } from '@lib/auth'
import { TFeedback } from '@utils/types'

type Props = {
  feedbackId: string
}

export const DeleteFeedbackButton = ({ feedbackId }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean | undefined>()
  const cancelRef = useRef()
  const auth = useAuth()

  const onClose = () => setIsOpen(false)
  const onDelete = () => {
    deleteFeedback(feedbackId)
    mutate(
      ['/api/feedback', auth.user.token],
      async data => {
        return {
          allFeedback: data.allFeedback.filter(
            (feedback: TFeedback) => feedback.id !== feedbackId
          )
        }
      },
      false
    )
    onClose()
  }

  return (
    <>
      <IconButton
        aria-label="Delete feedback"
        icon={<DeleteIcon />}
        variant="ghost"
        onClick={() => setIsOpen(true)}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Feedback
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
