import React, { memo } from 'react'
import { Box, Button, Typography } from '@mui/material'
import StaticImage from 'src/components/StaticImage'
import Link from 'next/link'
import { ReactSVG } from 'react-svg'
import _ from 'lodash'
import { StyledCardProduct } from 'src/styles/product'
import { arrayGender } from 'src/core/components/Header'
import { currencyConvert, currencyDollar } from 'src/pages/shop/[type]/[id]/[slug]'
import { BreakpointsContext } from 'src/contexts/breakpoints'
import schema, { Gender, GoodsType } from 'schemas'

interface Props {
  data: schema['schemas']['Product']
  imagePath: string
  truncate?: number
  isVideo?: boolean
  withGender?: boolean
}

const PlayIcon = memo(function PlayIcon() {
  const { downMd } = React.useContext(BreakpointsContext)
  return (
    <ReactSVG
      beforeInjection={(svg) => {
        svg.classList.add(`svg-icon`)
        svg.setAttribute(
          'style',
          `width: ${downMd ? 45 : 54}px; height: ${downMd ? 45 : 54}px; display: block;`
        )
      }}
      className="wrapper-svg"
      src={`/images/icons/play.svg`}
      wrapper="div"
    />
  )
})

const LabelCard = memo(function LabelCard({ text }: any) {
  const labelContent = React.useMemo(() => {
    switch (text) {
      case 'BEST':
        return { backgroundColor: '#014CAF', text: 'Best Seller' }
      case 'NEW':
        return { backgroundColor: '#0FB600', text: 'New Release' }
      default:
        return { backgroundColor: '#EC0000', text: 'Out of Stock' }
    }
  }, [text])
  return (
    <Typography component="span" sx={{ backgroundColor: labelContent.backgroundColor }}>
      {labelContent.text}
    </Typography>
  )
})

const CardProduct: React.FunctionComponent<Props> = ({
  data,
  imagePath,
  truncate,
  isVideo,
  withGender,
}: Props) => {
  const linkUrl = React.useMemo(() => {
    if (data.goodsType === GoodsType['GOODS']) {
      if (_.includes(arrayGender, data.gender ? Gender[data.gender] : '')) {
        return `/shop/${data.gender?.toLowerCase()}/${data.id}/${data.slug}`
      } else {
        return `/shop/${Gender['MAN']}/${data.id}/${data.slug}`
      }
    } else if (data.goodsType === GoodsType['OTHERS']) {
      return `/shop/${GoodsType['OTHERS']}/${data.id}/${data.slug}`
    } else if (data.goodsType === GoodsType['CUSTOM']) {
      return `/${GoodsType['CUSTOM']}/${data.id}/${data.slug}`
    } else {
      if (isVideo) {
        return `/video/${data.id}/${data.slug}`
      }
      return '#'
    }
  }, [data, isVideo])
  return (
    <StyledCardProduct>
      <Link href={linkUrl} legacyBehavior passHref>
        <Button
          className="img"
          component="a"
          sx={{
            paddingTop: isVideo ? '70%' : '125%',
          }}
        >
          {isVideo && <PlayIcon />}
          {data.label && <LabelCard text={data.label} />}
          <StaticImage src={`${imagePath}/${data.img}`} priority alt="Wuruph" fill sizes="100%" />
        </Button>
      </Link>
      <Box className="box-content">
        <Typography className="title">
          <Link href={linkUrl}>{_.truncate(data.title || '', { length: truncate })}</Link>
        </Typography>
        <Box>
          {!!data.price && (
            <Typography className="price">
              IDR. {currencyConvert(data.price || 0, 'id-ID')} / $
              {currencyDollar(data.price || 0, data.exchangeRate || 0)}
            </Typography>
          )}
          {withGender && !!data.gender && (
            <Typography className="gender">
              {data.gender === 'UNISEX'
                ? `${Gender['MAN']}/${_.capitalize(Gender['WOMAN'])}`
                : _.lowerCase(data.gender)}
            </Typography>
          )}
        </Box>
      </Box>
    </StyledCardProduct>
  )
}

CardProduct.defaultProps = {
  truncate: 56,
  isVideo: false,
  withGender: true,
}

export default memo(CardProduct)
