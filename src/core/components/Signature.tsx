import React, { memo } from 'react'
import _ from 'lodash'
import { Grid, Box, Typography } from '@mui/material'
import { useStaticQuery } from 'src/hooks/useStaticQuery'
import { StyledSignature } from 'src/styles/app'
import Title from 'src/core/components/Title'
import Carousel from 'src/core/components/Carousel'
import getProducts from 'src/services/products/queries/getProducts'
import { arrayGender } from 'src/core/components/Header'
import { StyledSkeleton } from 'src/styles/skeleton'
import { BreakpointsContext } from 'src/contexts/breakpoints'
import FadeInVisible from 'src/core/animations/FadeInVisible'
import { GoodsType } from 'schemas'

interface Props {
  endPoint: string
}

export function convertText(text: string) {
  if (text === 'others') return 'Other Goods'
  if (text === 'custom') return 'Custom Order'
  return _.capitalize(text)
}

const ITEMS_PER_PAGE = 9

const Signature: React.FunctionComponent<Props> = ({ endPoint }: Props) => {
  const { downMd, downSm } = React.useContext(BreakpointsContext)
  const whereParams = React.useMemo(() => {
    if (_.includes(arrayGender, endPoint)) {
      return { gender: _.upperCase(endPoint) }
    }
    return endPoint ? { goodsType: endPoint } : null
  }, [endPoint])
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
    <StyledSignature paddingBottom={downMd ? 2 : 4}>
      <Title
        text={convertText(endPoint)}
        withButton
        link={endPoint === GoodsType['CUSTOM'] ? `/custom` : `/shop/${endPoint}`}
      />
      {isLoading ? (
        <Box marginY={3}>
          <Grid container spacing={downMd ? 2 : 4}>
            {[...new Array(3)].map((_v, i) => (
              <Grid key={i} item xs={6} sm={4}>
                <StyledSkeleton
                  variant="rounded"
                  width="100%"
                  height={downSm ? 170 : downMd ? 220 : 320}
                />
                <StyledSkeleton className="text" variant="rounded" width="100%" height={18} />
                <StyledSkeleton className="text" variant="rounded" width="80%" height={18} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : data?.products?.length ? (
        <FadeInVisible origin="left" distance="-20%">
          <Carousel
            data={data?.products || null}
            iconColor="dark"
            withTitle
            isProduct={true}
            slidesToShow={downSm ? 2 : 3}
            autoplay={false}
            withGender={!_.includes(arrayGender, endPoint)}
          />
        </FadeInVisible>
      ) : (
        <FadeInVisible>
          <Typography align="center" paddingY={8} color="grey.500">
            Coming Soon
          </Typography>
        </FadeInVisible>
      )}
    </StyledSignature>
  )
}

Signature.defaultProps = {}

export default memo(Signature)
