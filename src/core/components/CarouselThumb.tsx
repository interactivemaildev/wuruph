import React, { memo } from 'react'
import { Box } from '@mui/material'
import Slider from 'react-slick'
import StaticImage from 'src/components/StaticImage'
import { StyledBoxCarouselThumb, StyledBoxCarouselThumbs } from 'src/styles/carousel'
import { Arrow } from 'src/core/components/Carousel'

interface Props {
  data: string[]
}

const slidesToShow = 4

const CarouselThumb: React.FunctionComponent<Props> = ({ data }: Props) => {
  console.log('data', data)
  const slider = React.useRef<Slider>(null)
  const sliderThumb = React.useRef<Slider>(null)
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  }
  const settingsThumb = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: false,
  }
  const handleNextPrev = React.useCallback((isNext: boolean) => {
    if (isNext) {
      slider?.current?.slickNext()
      sliderThumb?.current?.slickNext()
    } else {
      slider?.current?.slickPrev()
      sliderThumb?.current?.slickPrev()
    }
  }, [])
  const handleClick = React.useCallback((i: number) => {
    slider?.current?.slickGoTo(i)
    sliderThumb?.current?.slickGoTo(i)
  }, [])
  return (
    <Box>
      <StyledBoxCarouselThumb>
        <Slider ref={slider} {...settings}>
          {data.map((item, i) => (
            <Box key={i} className="items">
              <StaticImage key={i} alt="Wuruph" src={item} fill priority={true} sizes="100%" />
            </Box>
          ))}
        </Slider>
      </StyledBoxCarouselThumb>
      <StyledBoxCarouselThumbs>
        {data.length > slidesToShow && (
          <Arrow className="slick-arrow prev" onClick={() => handleNextPrev(false)} />
        )}
        <Slider ref={sliderThumb} {...settingsThumb}>
          {data.map((item: string, i: number) => (
            <Box key={i} className="items">
              <StaticImage
                key={i}
                alt="Wuruph"
                src={item}
                fill
                priority={true}
                sizes="100%"
                onClick={() => handleClick(i)}
              />
            </Box>
          ))}
        </Slider>
        {data.length > slidesToShow && (
          <Arrow className="slick-arrow next" onClick={() => handleNextPrev(true)} />
        )}
      </StyledBoxCarouselThumbs>
    </Box>
  )
}

CarouselThumb.defaultProps = {}

export default memo(CarouselThumb)
