import React from 'react'
import { useController, Control } from 'react-hook-form'
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from '@chakra-ui/react'

import { useMetaError } from '../../hooks/useMetaError'

type Props = {
  name: string
  label?: string
  control: Control
  rules?: any
  ref?: any
  type?: string
  placeholder?: string
}

export const InputField = (props: Props) => {
  const { type = 'text', label, placeholder = '' } = props
  const { field, meta } = useController(props)
  const { errorMessage, hasError } = useMetaError(meta)

  return (
    <Box m="3% 0">
      <FormControl isInvalid={hasError}>
        <FormLabel>{label}</FormLabel>
        <Input {...field} placeholder={placeholder} type={type} />
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>
    </Box>
  )
}
