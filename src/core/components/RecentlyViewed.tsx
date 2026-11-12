import React, { memo } from 'react'
import _ from 'lodash'
import { Box, Grid } from '@mui/material'
import { StyledRecommendation } from 'src/styles/app'
import Title from 'src/core/components/Title'
import CardProduct from 'src/core/components/CardProduct'
import { BreakpointsContext } from 'src/contexts/breakpoints'
import FadeInVisible from 'src/core/animations/FadeInVisible'
import schema from 'schemas'

interface Props {
  data: schema['schemas']['Product'][]
}

const RecentlyViewed: React.FunctionComponent<Props> = ({ data }: Props) => {
  const { downMd } = React.useContext(BreakpointsContext)
  return (
    <StyledRecommendation>
      <Box paddingTop={downMd ? 0 : 2} marginBottom={downMd ? 2 : 4}>
        <Title text={'Recently Viewed'} />
      </Box>
      <FadeInVisible distance="20%">
        <Grid container spacing={downMd ? 2 : 4}>
          {data &&
            data.map((item, i) => (
              <Grid key={i} item xs={6} sm={3}>
                <CardProduct
                  imagePath={`/images/product_images/post_${item.id}`}
                  data={item}
                  truncate={40}
                />
              </Grid>
            ))}
        </Grid>
      </FadeInVisible>
    </StyledRecommendation>
  )
}

RecentlyViewed.defaultProps = {}

export default memo(RecentlyViewed)
