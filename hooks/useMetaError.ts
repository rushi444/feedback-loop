type MetaProps = {
  invalid: boolean | any
  isTouched: boolean
  isDirty: boolean
}

export const useMetaError = ({ invalid, isTouched }: MetaProps) => {
  const errorMessage = (isTouched && invalid?.message) || ''
  return {
    errorMessage,
    hasError: !!errorMessage
  }
}
