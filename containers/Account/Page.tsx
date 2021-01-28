import React from 'react'
import { NextSeo } from 'next-seo'

export const Page = ({ name, path, children }) => {
  const title = `Feedback Loop– ${name}`
  const url = `https://fastfeedback.io${path}`

  return (
    <NextSeo>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title
        }}
      />
      {children}
    </NextSeo>
  )
}
