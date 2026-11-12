import React from 'react'
import type { NextPage } from 'next'
import _ from 'lodash'
import { Box, Grid, Divider } from '@mui/material'
import { useStaticQuery } from 'src/hooks/useStaticQuery'
import { useRouter } from 'next/router'
import Layout from 'src/core/components/Layout'
import Recommendation from 'src/core/components/Recommendation'
import Landing from 'src/core/components/Landing'
import Title from 'src/core/components/Title'
import getProducts from 'src/services/products/queries/getProducts'
import CardProduct from 'src/core/components/CardProduct'
import CustomForm from 'src/core/components/CustomForm'
import RecentlyViewed from 'src/core/components/RecentlyViewed'
import PaginationComponent from 'src/core/components/Pagination'
import { StyledInner, StyledCustom } from 'src/styles/app'
import useRecently from 'src/hooks/useRecently'
import { StyledSkeleton } from 'src/styles/skeleton'
import { BreakpointsContext } from 'src/contexts/breakpoints'
import SeoGlobal from 'src/core/components/seo/global'
import FadeInVisible from 'src/core/animations/FadeInVisible'
import { GoodsType } from 'schemas'
import { staticCustomDescription, staticLanding } from 'src/data/static'

interface Props {
  description: string
  landing: string
}

const ITEMS_PER_PAGE = 12

const Custom: NextPage<Props> = ({ description, landing }: Props) => {
  const router = useRouter()
  const { downMd, downSm } = React.useContext(BreakpointsContext)
  const { recentlyData, isLoadingRecently } = useRecently()
  const page = Number(router.query.page) || 0
  const [data, { isLoading }] = useStaticQuery(
    getProducts,
    {
      where: { goodsType: GoodsType['CUSTOM'] },
      orderBy: null,
      skip: ITEMS_PER_PAGE * page,
      take: ITEMS_PER_PAGE,
    }
  )
  const links = React.useMemo(() => {
    return [
      {
        title: 'Shop',
        url: null,
      },
      {
        title: 'Custom Order',
        url: null,
      },
    ]
  }, [])
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
        <Landing links={links} img={landing} title={`Custom Order`} />
      </Layout>
      <Divider />
      <Layout paddingY={0}>
        <StyledInner>
          <Grid container spacing={6}>
            <Grid className="first-grid" item xs={12} md={6}>
              <StyledCustom>
                <Title text={`Custom Order Process`} />
                <FadeInVisible distance="20%">
                  <div className="text" dangerouslySetInnerHTML={{ __html: description }} />
                </FadeInVisible>
              </StyledCustom>
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledCustom height="100%">
                <Title text={`Drop Your Idea`} />
                <FadeInVisible distance="20%">
                  <CustomForm />
                </FadeInVisible>
              </StyledCustom>
            </Grid>
          </Grid>
        </StyledInner>
      </Layout>
      <Divider />
      <Layout paddingY={0}>
        <StyledInner>
          <Box className="header">
            <Title text={isLoading ? 'Loading...' : `${data?.count || 0} Portfolio Results`} />
          </Box>
        </StyledInner>
      </Layout>
      <Divider />
      <Layout paddingY={4}>
        <StyledInner>
          <Grid container spacing={downMd ? 2 : 4}>
            {isLoading
              ? [...new Array(8)].map((_v, i) => (
                  <Grid key={i} item xs={6} sm={4} md={3}>
                    <StyledSkeleton variant="rounded" width="100%" height={260} />
                    <StyledSkeleton className="text" variant="rounded" width="100%" height={18} />
                    <StyledSkeleton className="text" variant="rounded" width="80%" height={18} />
                  </Grid>
                ))
              : data?.products.map((item, i) => (
                  <Grid key={i} item xs={6} sm={4} md={3}>
                    <CardProduct data={item} imagePath={`/images/product_images/post_${item.id}`} />
                  </Grid>
                ))}
          </Grid>
          {data && data.count > ITEMS_PER_PAGE && (
            <Box marginY={downMd ? 3 : 6}>
              <PaginationComponent
                count={Math.ceil((data?.count || 0) / ITEMS_PER_PAGE)}
                page={page}
                loading={isLoading}
                onClick={handlePagination}
              />
            </Box>
          )}
        </StyledInner>
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
  const description = staticCustomDescription
  const landing = staticLanding['custom']
  return {
    props: {
      description,
      landing,
    },
    revalidate: 60,
  }
}

export default Custom
