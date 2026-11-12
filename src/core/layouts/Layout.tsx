import Head from 'next/head'
import React from 'react'

interface Props {
  title?: string
  children?: React.ReactNode
}

const Layout: React.FunctionComponent<Props> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{`Wuruph | ${title}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </>
  )
}

export default Layout
