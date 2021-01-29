import React from 'react'
import { FormLabel as ChakraFormLabel } from '@chakra-ui/react'

type Props = {
  label: string
}

export const FormLabel = ({ label }: Props) => (
  <ChakraFormLabel>{label}</ChakraFormLabel>
)

export default FormLabel
