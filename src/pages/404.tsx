import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, CircularProgress } from '@mui/material'

// ------------------------------------------------------
// This page is rendered if a route match is not found
// ------------------------------------------------------
export default function Page404() {
  const statusCode = 404
  const title = 'This page could not be found'
  const router = useRouter()
  /* eslint-disable */
  React.useEffect(() => {
    router.push('/')
  }, [])
  /* eslint-enable */
  return (
    <>
      <Head>
        <title>{`${statusCode}: ${title}`}</title>
      </Head>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100%">
        <CircularProgress color="secondary" size={30} />
      </Box>
    </>
  )
}
