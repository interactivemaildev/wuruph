import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Box, Divider, Grid, Typography } from '@mui/material'
import { useStaticQuery } from 'src/hooks/useStaticQuery'
import Layout from 'src/core/components/Layout'
import Landing from 'src/core/components/Landing'
import CardArticle from 'src/core/components/CardArticle'
import CardProduct from 'src/core/components/CardProduct'
import Recommendation from 'src/core/components/Recommendation'
import PaginationComponent from 'src/core/components/Pagination'
import RecentlyViewed from 'src/core/components/RecentlyViewed'
import { StyledArticle } from 'src/styles/article'
import { StyledSignature } from 'src/styles/app'
import Title from 'src/core/components/Title'
import getArticles from 'src/services/articles/queries/getArticles'
import getVideos from 'src/services/videos/queries/getVideos'
import useRecently from 'src/hooks/useRecently'
import { StyledSkeleton } from 'src/styles/skeleton'
import { BreakpointsContext } from 'src/contexts/breakpoints'
import SeoGlobal from 'src/core/components/seo/global'
import { staticLanding } from 'src/data/static'

interface Props {
  landing: string
}

const ITEMS_PER_PAGE = 9
const ITEMS_PER_PAGE_VIDEO = 4

const Journal: NextPage<Props> = ({ landing }: Props) => {
  const router = useRouter()
  const { downMd } = React.useContext(BreakpointsContext)
  const { recentlyData, isLoadingRecently } = useRecently()
  const page = Number(router.query.page) || 0
  const videoPage = Number(router.query.videopage) || 0
  const links = React.useMemo(() => {
    return [
      {
        title: 'Journal',
        url: null,
      },
    ]
  }, [])
  const [data, { isLoading }] = useStaticQuery(
    getArticles,
    {
      where: { type: 'journal' },
      skip: ITEMS_PER_PAGE * page,
      take: ITEMS_PER_PAGE,
    }
  )
  const [dataVideos, { isLoading: videoLoading }] = useStaticQuery(
    getVideos,
    {
      skip: ITEMS_PER_PAGE_VIDEO * videoPage,
      take: ITEMS_PER_PAGE_VIDEO,
    }
  )
  console.log('data', data)
  const handlePagination = React.useCallback(
    async (page: number) => {
      let queryParams = { ...router.query, page }
      if (videoPage > 0) {
        queryParams['videopage'] = videoPage
      }
      await router.push({
        pathname: router.pathname,
        query: queryParams,
      })
    },
    [videoPage]
  )
  const handlePaginationVideo = React.useCallback(
    async (pageChange: number) => {
      let queryParams = { ...router.query, videopage: pageChange }
      if (videoPage > 0) {
        queryParams['page'] = page
      }
      await router.push({
        pathname: router.pathname,
        query: queryParams,
      })
    },
    [page]
  )
  return (
    <React.Fragment>
      <SeoGlobal />
      <Layout paddingY={0}>
        <Landing links={links} img={landing} title="Journal" isArticle />
      </Layout>
      <Layout paddingY={0}>
        <StyledArticle className="journal">
          <Grid container spacing={downMd ? 2 : 4}>
            {isLoading ? (
              [...new Array(9)].map((_v, i) => (
                <Grid key={i} item xs={12} sm={6} md={4}>
                  <StyledSkeleton variant="rounded" width="100%" height={260} />
                  <StyledSkeleton className="text" variant="rounded" width="100%" height={18} />
                  <StyledSkeleton className="text" variant="rounded" width="80%" height={18} />
                </Grid>
              ))
            ) : data?.articles.length ? (
              data.articles.map((item, i) => (
                <Grid key={i} item xs={12} sm={4}>
                  <CardArticle data={item} truncateDesc={130} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography align="center" paddingY={8} color="grey.500">
                  Sorry, Data Not Found
                </Typography>
              </Grid>
            )}
          </Grid>
          {data && data.count > ITEMS_PER_PAGE && (
            <Box marginY={6}>
              <PaginationComponent
                count={Math.ceil((data?.count || 0) / ITEMS_PER_PAGE)}
                page={page}
                loading={isLoading}
                onClick={handlePagination}
              />
            </Box>
          )}
        </StyledArticle>
      </Layout>
      <Divider />
      <Layout paddingY={0}>
        <StyledSignature className="video journal">
          <Box marginBottom={3}>
            <Title text="Youtube" />
          </Box>
          <Grid container spacing={downMd ? 2 : 4}>
            {videoLoading
              ? [...new Array(4)].map((_v, i) => (
                  <Grid key={i} item xs={6}>
                    <StyledSkeleton variant="rounded" width="100%" height={250} />
                    <StyledSkeleton className="text" variant="rounded" width="80%" height={18} />
                  </Grid>
                ))
              : dataVideos?.videos.map((item, i) => (
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
          {dataVideos && dataVideos.count > ITEMS_PER_PAGE_VIDEO && (
            <Box marginY={6}>
              <PaginationComponent
                count={Math.ceil((dataVideos?.count || 0) / ITEMS_PER_PAGE_VIDEO)}
                page={videoPage}
                loading={isLoading}
                onClick={handlePaginationVideo}
              />
            </Box>
          )}
        </StyledSignature>
      </Layout>
      <Divider />
      <Layout paddingY={0}>
        <Recommendation />
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

export const getStaticProps = async () => {
  const landing = staticLanding['journal']
  return {
    props: { landing },
    revalidate: 60,
  }
}

export default Journal
