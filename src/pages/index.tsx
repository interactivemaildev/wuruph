import React from 'react'
import type { NextPage } from 'next'
import { Box, Divider } from '@mui/material'
import { useStaticQuery } from 'src/hooks/useStaticQuery'
import Layout from 'src/core/components/Layout'
import Carousel from 'src/core/components/Carousel'
import Signature from 'src/core/components/Signature'
import Recommendation from 'src/core/components/Recommendation'
import Advantages from 'src/core/components/Advantages'
import { StyledSkeleton } from 'src/styles/skeleton'
import SignatureYoutube from 'src/core/components/SignatureYoutube'
import getSliders from 'src/services/sliders/queries/getSliders'
import { subMenuShop } from 'src/core/components/Header'
import SeoGlobal from 'src/core/components/seo/global'
import FadeInVisible from 'src/core/animations/FadeInVisible'
import { BreakpointsContext } from 'src/contexts/breakpoints'

interface Props {}

const Home: NextPage<Props> = () => {
  const { downSm } = React.useContext(BreakpointsContext)
  const [data, { isLoading }] = useStaticQuery(getSliders, undefined)
  return (
    <React.Fragment>
      <SeoGlobal />
      <Layout paddingY={0}>
        <FadeInVisible distance="-20%">
          {isLoading ? (
            <StyledSkeleton
              className="slider"
              variant="rounded"
              width="100%"
              height={downSm ? 200 : 400}
            />
          ) : (
            !!data?.length && <Carousel data={data || null} iconColor="light" withTitle />
          )}
        </FadeInVisible>
      </Layout>
      {subMenuShop.map((item, i) => (
        <Box key={i}>
          <Layout paddingY={0}>
            <Signature endPoint={item} />
          </Layout>
          <Divider />
        </Box>
      ))}
      <Layout paddingY={0}>
        <Recommendation />
      </Layout>
      <FadeInVisible distance="20%">
        <Divider />
        <Layout paddingY={0}>
          <Advantages />
        </Layout>
        <Divider />
      </FadeInVisible>
      <Layout paddingY={4}>
        <SignatureYoutube />
      </Layout>
    </React.Fragment>
  )
}

export default Home
