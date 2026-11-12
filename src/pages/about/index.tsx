import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Box, Divider, Grid, Typography } from '@mui/material'
import { useStaticQuery } from 'src/hooks/useStaticQuery'
import Layout from 'src/core/components/Layout'
import Landing from 'src/core/components/Landing'
import CardArticle from 'src/core/components/CardArticle'
import Recommendation from 'src/core/components/Recommendation'
import RecentlyViewed from 'src/core/components/RecentlyViewed'
import PaginationComponent from 'src/core/components/Pagination'
import { StyledArticle } from 'src/styles/article'
import getArticles from 'src/services/articles/queries/getArticles'
import getLanding from 'src/services/settings/queries/getLanding'
import useRecently from 'src/hooks/useRecently'
import { StyledSkeleton } from 'src/styles/skeleton'
import { BreakpointsContext } from 'src/contexts/breakpoints'
import SeoGlobal from 'src/core/components/seo/global'
import { staticLanding } from 'src/data/static'

interface Props {
  landing: string
}

const ITEMS_PER_PAGE = 7

const About: NextPage<Props> = ({ landing }: Props) => {
  const router = useRouter()
  const { downMd, downSm } = React.useContext(BreakpointsContext)
  const { recentlyData, isLoadingRecently } = useRecently()
  const page = Number(router.query.page) || 0
  const links = React.useMemo(() => {
    return [
      {
        title: 'About',
        url: null,
      },
    ]
  }, [])
  const [data, { isLoading }] = useStaticQuery(
    getArticles,
    {
      where: { type: 'about' },
      skip: ITEMS_PER_PAGE * page,
      take: ITEMS_PER_PAGE,
    }
  )
  console.log('data', data)
  const handlePagination = React.useCallback(async (page: number) => {
    let queryParams = { ...router.query, page }
    await router.push({
      pathname: router.pathname,
      query: queryParams,
    })
  }, [])
  return (
    <React.Fragment>
      <SeoGlobal />
      <Layout paddingY={0}>
        <Landing links={links} img={landing} title="About" isArticle />
      </Layout>
      <Layout paddingY={0}>
        <StyledArticle>
          <Grid container spacing={downMd ? 2 : 4}>
            {isLoading ? (
              [...new Array(9)].map((_v, i) => (
                <Grid key={i} item xs={12} sm={6} md={4}>
                  <StyledSkeleton variant="rounded" width="100%" height={170} />
                  <StyledSkeleton className="text" variant="rounded" width="100%" height={18} />
                  <StyledSkeleton className="text" variant="rounded" width="80%" height={18} />
                </Grid>
              ))
            ) : data?.articles.length ? (
              data.articles.map((item, i) => {
                const isFirst = i === 0
                return (
                  <Grid key={i} item xs={isFirst && !downSm ? 12 : downSm ? 12 : 4}>
                    <CardArticle
                      data={item}
                      isHorizontal={isFirst && !downSm}
                      truncateDesc={isFirst && !downSm ? (downSm ? 300 : 450) : 130}
                    />
                  </Grid>
                )
              })
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
  const landing = staticLanding['about']
  return {
    props: {
      landing,
    },
    revalidate: 60,
  }
}

export default About
