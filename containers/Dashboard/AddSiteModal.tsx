import { useForm } from 'react-hook-form'
import { mutate } from 'swr'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  useDisclosure
} from '@chakra-ui/react'

import { createSite } from '@lib/db'
import { useAuth } from '@lib/auth'
import { InputField } from '@components/fields/InputField'

export const AddSiteModal = ({ children }) => {
  const toast = useToast()
  const auth = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleSubmit, control } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      url: ''
    }
  })

  const onCreateSite = ({ name, url }) => {
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url
    }

    createSite(newSite)
    toast({
      title: 'Success!',
      description: "We've added your site.",
      status: 'success',
      duration: 5000,
      isClosable: true
    })
    mutate(
      ['/api/sites', auth.user.token],
      async data => {
        return { sites: [...data.sites, newSite] }
      },
      false
    )
    onClose()
  }

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)'
        }}
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputField
              name="name"
              label="Name"
              control={control}
              placeholder="My site"
              rules={{ required: 'Required!' }}
            />
            <InputField
              name="url"
              label="Link"
              control={control}
              placeholder='http://mysite.com'
              rules={{ required: 'Required!' }}
            />
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>
            <Button
              backgroundColor="#99FFFE"
              color="#194D4C"
              fontWeight="medium"
              type="submit"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
