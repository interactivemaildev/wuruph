import React, { memo } from 'react'
import { Box, Grid, Divider } from '@mui/material'
import { useRouter } from 'next/router'
import Layout from 'src/core/components/Layout'
import Landing from 'src/core/components/Landing'
import Title from 'src/core/components/Title'
import Filter from 'src/core/components/Filter'
import { StyledInner } from 'src/styles/app'
import CardProduct from 'src/core/components/CardProduct'
import PaginationComponent from 'src/core/components/Pagination'
import { StyledSkeleton } from 'src/styles/skeleton'
import { BreakpointsContext } from 'src/contexts/breakpoints'
import schema from 'schemas'

interface Link {
  title: string
  url: string | null
}

interface Props {
  links: Link[]
  landingImg: string
  landingTitle: string
  itemPerPage: number
  page: number
  count: number
  data: schema['schemas']['Product'][]
  loading: boolean
  handlePagination: (page: number, query: any) => void
  withGenderFilter?: boolean
  withCategoriesFilter?: boolean
}

const ShopMain: React.FunctionComponent<Props> = ({
  links,
  landingImg,
  landingTitle,
  itemPerPage,
  page,
  count,
  data,
  loading,
  handlePagination,
  withGenderFilter,
  withCategoriesFilter,
}: Props) => {
  const { downMd } = React.useContext(BreakpointsContext)
  const router = useRouter()
  const { q } = router.query
  const isSearch = React.useMemo(() => landingTitle === 'Search', [landingTitle])
  return (
    <React.Fragment>
      <Layout paddingY={0}>
        <Landing links={links} img={landingImg} title={landingTitle} />
      </Layout>
      <Divider />
      <Layout paddingY={0}>
        <StyledInner>
          <Grid container spacing={0}>
            <Grid item md={3} display={downMd ? 'none' : 'block'}>
              <Box className="header">
                <Title text="Filter" distance="0" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Box className={`${downMd ? '' : 'border'} header`}>
                <Title
                  text={
                    loading
                      ? 'Loading...'
                      : isSearch
                      ? `${count || 0} result for "${q || ''}"`
                      : `${count || 0} Products Results`
                  }
                  distance="0"
                />
              </Box>
            </Grid>
          </Grid>
        </StyledInner>
      </Layout>
      <Divider />
      <Layout paddingY={downMd ? 2 : 4}>
        <StyledInner>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={3}>
              <Filter
                withGenderFilter={withGenderFilter}
                withCategoriesFilter={withCategoriesFilter}
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <Box className="products">
                <Grid container spacing={downMd ? 2 : 4}>
                  {loading
                    ? [...new Array(9)].map((_v, i) => (
                        <Grid key={i} item xs={6} sm={4}>
                          <StyledSkeleton
                            variant="rounded"
                            width="100%"
                            height={downMd ? 200 : 260}
                          />
                          <StyledSkeleton
                            className="text"
                            variant="rounded"
                            width="100%"
                            height={18}
                          />
                          <StyledSkeleton
                            className="text"
                            variant="rounded"
                            width="80%"
                            height={18}
                          />
                        </Grid>
                      ))
                    : data.map((item, i) => (
                        <Grid key={i} item xs={6} sm={4}>
                          <CardProduct
                            data={item}
                            imagePath={`/images/product_images/post_${item.id}`}
                          />
                        </Grid>
                      ))}
                </Grid>
              </Box>
              {data && count > itemPerPage && (
                <Box marginY={6}>
                  <PaginationComponent
                    count={Math.ceil((count || 0) / itemPerPage)}
                    page={page}
                    loading={loading}
                    onClick={handlePagination}
                  />
                </Box>
              )}
            </Grid>
          </Grid>
        </StyledInner>
      </Layout>
    </React.Fragment>
  )
}

ShopMain.defaultProps = {
  withGenderFilter: false,
  withCategoriesFilter: false,
}

export default memo(ShopMain)
