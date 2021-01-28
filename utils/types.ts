export type TUser = {
  uid: string
  email: string
  name: string
  provider: string
  photoURL: string
  token: string
}

export type TSite = {
  id: string
  authorId: string
  createdAt: string
  name: string
  url: string
}

export type TFeedback = {
  id?: string
  provider: string
  createdAt: string
  siteId: string | string[]
  author: string
  authorId: string
  rating?: number
  text: string
  status: string
  settings?: TSettings
  isLast?: boolean
}

export type TNewFeedback = {
  author: string
  authorId: string
  siteId: string | string[]
  text: string
  createdAt: string
  provider: string
  isLast?: boolean
  status: string
}

export type TNewSite = {
  authorId: string
  createdAt: string
  name: string
  url: string
  settings: TSettings
}

type TSettings = {
  icons: boolean
  timestamp: boolean
  ratings: boolean
}
