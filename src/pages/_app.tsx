import * as React from 'react'
import Head from 'next/head'
import { GlobalStyles } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRouter } from 'next/router'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import theme from '../styles/theme'
import { StyledComponent } from '../styles/app'
import createEmotionCache from '../styles/createEmotionCache'
import Header from 'src/core/components/Header'
import Footer from 'src/core/components/Footer'
import Progress from 'src/core/components/Progress'
import BottomNav from 'src/core/components/BottomNav'
import SnackbarProvider from 'src/contexts/snackbar'
import { PageLoadingContext } from 'src/contexts/pageLoading'
import { BreakpointsContext } from 'src/contexts/breakpoints'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps {
  emotionCache?: EmotionCache
  Component: any
  pageProps: any
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const router = useRouter()
  const getLayout = Component.getLayout || ((page) => page)
  const [pageLoading, setPageLoading] = React.useState(false)
  const down400 = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm - 200))
  const downSm = useMediaQuery(theme.breakpoints.down('sm'))
  const downMd = useMediaQuery(theme.breakpoints.down('md'))
  const downLg = useMediaQuery(theme.breakpoints.down('lg'))
  React.useEffect(() => {
    const handleStart = () => {
      setPageLoading(true)
    }
    const handleComplete = () => {
      setPageLoading(false)
    }
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)
  }, [router])
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BreakpointsContext.Provider
          value={{
            down400,
            downSm,
            downMd,
            downLg,
          }}
        >
          <GlobalStyles styles={{ body: { cursor: pageLoading ? 'progress' : 'auto' } }} />
          <SnackbarProvider>
            <PageLoadingContext.Provider
              value={{
                pageLoading,
              }}
            >
              <Progress isAnimating={pageLoading} />
              <Header />
              {downSm && <BottomNav />}
              <StyledComponent>{getLayout(<Component {...pageProps} />)}</StyledComponent>
              <Footer />
            </PageLoadingContext.Provider>
          </SnackbarProvider>
        </BreakpointsContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
