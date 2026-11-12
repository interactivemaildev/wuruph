import React, { memo } from 'react'
import _ from 'lodash'
import { Box, Grid, Typography } from '@mui/material'
import { useStaticQuery } from 'src/hooks/useStaticQuery'
import { StyledRecommendation } from 'src/styles/app'
import Title from 'src/core/components/Title'
import CardProduct from 'src/core/components/CardProduct'
import getProducts from 'src/services/products/queries/getProducts'
import { arrayGender } from 'src/core/components/Header'
import { StyledSkeleton } from 'src/styles/skeleton'
import { BreakpointsContext } from 'src/contexts/breakpoints'
import FadeInVisible from 'src/core/animations/FadeInVisible'

interface Props {
  type?: string
  title?: string
  withButton?: boolean
}

const ITEMS_PER_PAGE = 4

const Recommendation: React.FunctionComponent<Props> = ({ type, title, withButton }: Props) => {
  const { downMd } = React.useContext(BreakpointsContext)
  const whereParams = React.useMemo(() => {
    if (_.includes(arrayGender, type)) {
      return { gender: _.upperCase(type) }
    }
    return type ? { goodsType: type } : null
  }, [type])
  const [data, { isLoading }] = useStaticQuery(
    getProducts,
    {
      where: whereParams,
      orderBy: null,
      skip: ITEMS_PER_PAGE * 0,
      take: ITEMS_PER_PAGE,
    }
  )
  return (
    <StyledRecommendation>
      <Box paddingTop={downMd ? 0 : 2} marginBottom={downMd ? 2 : 4}>
        <Title
          text={title || 'You May Also Like'}
          withButton={withButton}
          link={withButton ? `/shop/${type}` : undefined}
          buttonText="See All"
        />
      </Box>
      <FadeInVisible distance="20%">
        <Grid container spacing={downMd ? 2 : 4}>
          {isLoading ? (
            [...new Array(4)].map((_v, i) => (
              <Grid key={i} item xs={6} sm={3}>
                <StyledSkeleton variant="rounded" width="100%" height={260} />
                <StyledSkeleton className="text" variant="rounded" width="100%" height={18} />
                <StyledSkeleton className="text" variant="rounded" width="80%" height={18} />
              </Grid>
            ))
          ) : data?.products?.length ? (
            data.products.map((item, i) => (
              <Grid key={i} item xs={6} sm={3}>
                <CardProduct
                  imagePath={`/images/product_images/post_${item.id}`}
                  data={item}
                  truncate={40}
                  withGender={!_.includes(arrayGender, type)}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography align="center" paddingY={8} color="grey.500">
                Coming Soon
              </Typography>
            </Grid>
          )}
        </Grid>
      </FadeInVisible>
    </StyledRecommendation>
  )
}

Recommendation.defaultProps = {
  title: 'You May Also Like',
  withButton: false,
}

export default memo(Recommendation)
