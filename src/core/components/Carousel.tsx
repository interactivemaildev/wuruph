import React, { memo } from 'react'
import { Box, Typography } from '@mui/material'
import StaticImage from 'src/components/StaticImage'
import Slider from 'react-slick'
import { ReactSVG } from 'react-svg'
import { StyledBoxCarousel, StyledArrowCarousel } from 'src/styles/carousel'
import CardProduct from 'src/core/components/CardProduct'
import { BreakpointsContext } from 'src/contexts/breakpoints'
import schema from 'schemas'

interface Props {
  data: schema['schemas']['Product'][] | null
  iconColor?: 'dark' | 'light'
  withTitle?: boolean
  slidesToShow?: number
  autoplay?: boolean
  isProduct?: boolean
  withGender?: boolean
}

export const arrowSize = 48

export const Arrow = memo(function Arrow({ className, iconColor, onClick }: any) {
  return (
    <StyledArrowCarousel className={className} onClick={onClick}>
      <ReactSVG
        beforeInjection={(svg) => {
          svg.classList.add(`svg-icon`)
          svg.setAttribute(
            'style',
            `width: ${arrowSize}px; height: ${arrowSize}px; display: block;`
          )
        }}
        className={`wrapper-svg ${iconColor ? iconColor : 'dark'}`}
        src={`/images/icons/next-prev.svg`}
        wrapper="div"
        onClick={onClick}
      />
    </StyledArrowCarousel>
  )
})

const Carousel: React.FunctionComponent<Props> = ({
  data,
  iconColor,
  withTitle,
  slidesToShow = 1,
  autoplay,
  isProduct,
  withGender,
}: Props) => {
  const slider = React.useRef<Slider>(null)
  const { downMd } = React.useContext(BreakpointsContext)
  const settings = {
    dots: true,
    infinite: (data?.length || 0) > slidesToShow,
    speed: 200,
    arrows: !downMd,
    slidesToShow,
    slidesToScroll: slidesToShow,
    autoplay,
    cssEase: 'linear',
    autoplaySpeed: 5000,
    nextArrow: <Arrow iconColor={iconColor} />,
    prevArrow: <Arrow iconColor={iconColor} />,
  }
  return (
    <StyledBoxCarousel className={`carousel ${iconColor}`}>
      <Slider ref={slider} {...settings}>
        {!!data &&
          !!data.length &&
          data.map((item: schema['schemas']['Product'], i: number) => {
            return isProduct ? (
              <Box key={i} className="items carousel-product">
                <CardProduct
                  imagePath={`/images/product_images/post_${item.id}`}
                  data={item}
                  withGender={withGender}
                />
              </Box>
            ) : (
              <Box key={i} className="items carousel-image">
                {withTitle && <Typography>{item.title}</Typography>}
                <StaticImage
                  alt="Wuruph"
                  src={`/images/sliders/${item.img}`}
                  fill
                  priority={true}
                  sizes="100%"
                />
              </Box>
            )
          })}
      </Slider>
    </StyledBoxCarousel>
  )
}

Carousel.defaultProps = {
  iconColor: 'dark',
  withTitle: false,
  slidesToShow: 1,
  autoplay: true,
  isProduct: false,
  withGender: true,
}

export default memo(Carousel)
