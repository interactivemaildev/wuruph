import React from 'react'
import type { NextPage, NextPageContext } from 'next'
import _ from 'lodash'
import { Box, Divider, Grid, Typography } from '@mui/material'
import { StyledDetail, StyledDescription } from 'src/styles/product'
import { convertText } from 'src/core/components/Signature'
import Landing from 'src/core/components/Landing'
import Layout from 'src/core/components/Layout'
import CarouselThumb from 'src/core/components/CarouselThumb'
import RecentlyViewed from 'src/core/components/RecentlyViewed'
import FormButton from 'src/core/components/FormButton'
import useRecently from 'src/hooks/useRecently'
import Recommendation from 'src/core/components/Recommendation'
import getProduct from 'src/services/products/queries/getProduct'
import { staticProducts } from 'src/data/static'
import { BreakpointsContext } from 'src/contexts/breakpoints'
import schema, { Gender, GoodsType } from 'schemas'
import SeoGlobal from 'src/core/components/seo/global'
import FadeInVisible from 'src/core/animations/FadeInVisible'
import ShareButton from 'src/core/components/Share'

interface Props {
  initial: schema['schemas']['DetailProduct']
  isMobile: boolean
}

interface DescriptionProps {
  title: string
  description?: string
  isPreWrap?: boolean
  buttons?: schema['schemas']['Marketplace'][]
  variant?: 'contained' | 'outlined'
}

export function currencyConvert(value: number, locale: string) {
  const currency = new Intl.NumberFormat(locale).format(value)
  const isNan = _.isNaN(parseInt(currency.replace(/\./g, '')))
  return !isNan ? currency : 0
}

export function currencyDollar(idr: number, exchangeRate: number) {
  return (idr / exchangeRate).toFixed(2)
}

export const Description = React.memo(function Arrow({
  title,
  description,
  isPreWrap,
  buttons,
  variant,
}: DescriptionProps) {
  return (
    <StyledDescription>
      <FadeInVisible>
        <Typography className="title-desc">{title}</Typography>
      </FadeInVisible>
      {!!description && (
        <FadeInVisible>
          <div
            className={`text ${isPreWrap ? 'pre-wrap' : ''}`}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </FadeInVisible>
      )}
      {!!buttons?.length && (
        <FadeInVisible distance="20%">
          <Box display="flex">
            {buttons.map((item, i) => (
              <Box key={i} marginRight={1.5}>
                <FormButton text={item.title || ''} href={item.url} variant={variant} />
              </Box>
            ))}
          </Box>
        </FadeInVisible>
      )}
    </StyledDescription>
  )
})

const Detail: NextPage<Props> = ({ initial, isMobile }: Props) => {
  console.log('initial', initial)
  const { downMd } = React.useContext(BreakpointsContext)
  const { recentlyData, isLoadingRecently } = useRecently()
  const links = React.useMemo(() => {
    const middle = initial?.goodsType === 'custom' ? 'custom' : initial?.gender
    return [
      {
        title: 'Shop',
        url: null,
      },
      {
        title: convertText(middle || Gender['MAN']),
        url: null,
      },
      {
        title: 'Detail Product',
        url: null,
      },
    ]
  }, [])
  return (
    <>
      <SeoGlobal data={{ title: initial?.title || '', img: initial?.img || '' }} />
      <Layout paddingY={0}>
        <StyledDetail paddingTop={downMd ? 3 : 6}>
          <Landing links={links} />
        </StyledDetail>
      </Layout>
      <Layout paddingY={downMd ? 2 : 4}>
        <StyledDetail paddingBottom={downMd ? 2 : 4}>
          <Grid container spacing={downMd ? 3 : 5}>
            <Grid item xs={12} sm={5}>
              <FadeInVisible distance="20%">
                <CarouselThumb data={initial.files || []} />
              </FadeInVisible>
            </Grid>
            <Grid item xs={12} sm={7}>
              <FadeInVisible>
                <Typography className="title-header">{initial.title}</Typography>
              </FadeInVisible>
              <FadeInVisible>
                <ShareButton title={initial.title || ''} isMobile={isMobile} />
              </FadeInVisible>
              {initial.goodsType !== GoodsType['CUSTOM'] && (
                <FadeInVisible>
                  <Typography className="price-desc">
                    IDR. {currencyConvert(initial.price || 0, 'id-ID')} / $
                    {currencyDollar(initial.price || 0, initial.exchangeRate || 0)}
                  </Typography>
                </FadeInVisible>
              )}
              <Description title="Materials" isPreWrap description={initial.materials || '-'} />
              <Description title="Size Chart" isPreWrap description={initial.size || '-'} />
              <Description title="Description" description={initial.description || '-'} />
              {initial.goodsType !== GoodsType['CUSTOM'] && (
                <>
                  <Description
                    title="Available On"
                    buttons={initial.marketplaces || []}
                    variant="outlined"
                  />
                  <Description title="Order" buttons={initial.orders || []} />
                </>
              )}
            </Grid>
          </Grid>
        </StyledDetail>
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
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = staticProducts.map((p) => ({
    params: { type: (p.goodsType || 'goods') as string, id: String(p.id), slug: p.slug || '' },
  }))
  return { paths, fallback: 'blocking' }
}

export const getStaticProps = async ({ params }: any) => {
  const productId = parseInt(params?.id as string)
  const initial = await getProduct({ productId })
  return {
    props: { initial, isMobile: false },
    revalidate: 60,
  }
}

export default Detail
