import { GithubIcon } from '@components/Icons/GithubIcon'
import { GoogleIcon } from '@components/Icons/GoogleIcon'

export const getLogo = (provider: string) => {
  if (provider.includes('google')) {
    return <GoogleIcon ml={1} />
  }
  if (provider.includes('github')) {
    return <GithubIcon ml={1} />
  }
  return <p />
}
