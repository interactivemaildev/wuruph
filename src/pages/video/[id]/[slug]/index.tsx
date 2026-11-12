import React from 'react'
import type { NextPage } from 'next'
import _ from 'lodash'
import MobileDetect from 'mobile-detect'
import { useStaticQuery } from 'src/hooks/useStaticQuery'
import { Box, Grid, Divider, Typography } from '@mui/material'
import Layout from 'src/core/components/Layout'
import Landing from 'src/core/components/Landing'
import { StyledSignature } from 'src/styles/app'
import { StyledArticle } from 'src/styles/article'
import Title from 'src/core/components/Title'
import useRecently from 'src/hooks/useRecently'
import EmbedVideo from 'src/core/components/EmbedVideo'
import RecentlyViewed from 'src/core/components/RecentlyViewed'
import CardProduct from 'src/core/components/CardProduct'
import getVideo from 'src/services/videos/queries/getVideo'
import getVideos from 'src/services/videos/queries/getVideos'
import { staticVideos } from 'src/data/static'
import SeoGlobal from 'src/core/components/seo/global'
import FadeInVisible from 'src/core/animations/FadeInVisible'
import { BreakpointsContext } from 'src/contexts/breakpoints'
import ShareButton from 'src/core/components/Share'
import schema from 'schemas'

interface Props {
  initial: schema['schemas']['Video']
  isMobile: boolean
}

const VideoDetail: NextPage<Props> = ({ initial, isMobile }: Props) => {
  console.log('initial', initial)
  const { downMd } = React.useContext(BreakpointsContext)
  const { recentlyData, isLoadingRecently } = useRecently()
  const links = React.useMemo(() => {
    return [
      {
        title: 'Journal',
        url: null,
      },
    ]
  }, [])
  const [dataVideos] = useStaticQuery(
    getVideos,
    {
      skip: 0,
      take: 2,
    }
  )
  return (
    <React.Fragment>
      <SeoGlobal
        data={{
          title: initial?.title || '',
          img: `https://wuruph.com/images/videos/${initial?.img}` || '',
        }}
      />
      <Layout paddingY={0}>
        <Landing links={links} img="about.jpg" title="Journal" />
      </Layout>
      <Layout paddingY={0}>
        <StyledArticle>
          <Typography className="detail-title" marginBottom={2}>
            {initial.title}
          </Typography>
          <ShareButton title={initial.title || ''} isMobile={isMobile} />
          <EmbedVideo embedLink={initial.youtube} />
        </StyledArticle>
      </Layout>
      <Divider />
      <Layout paddingY={0}>
        <StyledSignature className="video journal">
          <Box marginBottom={3} marginTop={downMd ? 2 : 0}>
            <Title text="Releated Videos" />
          </Box>
          <FadeInVisible distance="20%">
            <Grid container spacing={downMd ? 2 : 4}>
              {dataVideos?.videos.map((item, i) => (
                <Grid key={i} item xs={6}>
                  <CardProduct
                    imagePath={`/images/videos`}
                    truncate={60}
                    data={item}
                    isVideo={true}
                  />
                </Grid>
              ))}
            </Grid>
          </FadeInVisible>
        </StyledSignature>
      </Layout>
      {!!recentlyData?.length && !isLoadingRecently && (
        <>
          <Divider />
          <Layout paddingY={0}>
            <RecentlyViewed data={recentlyData} />
          </Layout>
        </>
      )}
    </React.Fragment>
  )
}

export const getStaticPaths = async () => {
  const paths = staticVideos.map((v) => ({
    params: { id: String(v.id), slug: (v.title || 'video').toLowerCase().replace(/\s+/g, '-') },
  }))
  return { paths, fallback: 'blocking' }
}

export const getStaticProps = async ({ params }: any) => {
  const videoId = parseInt(params?.id as string)
  const initial = await getVideo({ videoId })
  return {
    props: { initial, isMobile: false },
    revalidate: 60,
  }
}

export default VideoDetail
