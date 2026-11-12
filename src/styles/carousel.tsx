import { Box, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import hexToRgba from 'hex-to-rgba'
import { arrowSize } from 'src/core/components/Carousel'
import { boxShadow } from 'src/styles/theme'

export const StyledBoxCarousel = styled(Box)(({ theme }) => ({
  position: 'relative',
  '&.carousel': {
    marginTop: theme.spacing(6),
  },
  '& .slick-slider': {
    position: 'relative',
    '&.detail-carousel': {
      margin: theme.spacing(3, 0, 8),
    },
    '& .slick-list': {
      overflow: 'hidden',
      borderRadius: theme.spacing(2),
      '& .slick-track': {
        display: 'flex',
        overflow: 'hidden',
        alignItems: 'stretch',
        paddingTop: 2,
        '& .slick-slide': {
          '& > div': {
            height: '100%',
          },
          '&.slick-active': {
            zIndex: 9,
          },
          '& .items': {
            display: 'block !important',
            position: 'relative',
            height: '100%',
            '& img': {
              display: 'block',
            },
            '&.carousel-image': {
              position: 'relative',
              height: theme.spacing(50),
              '& img': {
                position: 'relative !important',
                height: '100% !important',
                width: '100%',
                objectFit: 'cover',
              },
              '& .MuiTypography-root': {
                fontSize: theme.spacing(5),
                position: 'absolute',
                top: '50%',
                left: 0,
                transform: 'translateY(-50%)',
                width: '100%',
                textAlign: 'center',
                zIndex: theme.zIndex.tooltip,
                color: theme.palette.primary.main,
                fontWeight: 700,
              },
            },
            '&.carousel-product': {
              padding: theme.spacing(0, 2),
            },
            '&.detail': {
              padding: theme.spacing(3),
              '& img': {
                position: 'relative !important',
                height: 'auto !important',
              },
            },
          },
        },
      },
    },
    '& .slick-dots': {
      position: 'absolute',
      bottom: theme.spacing(2.5),
      left: theme.spacing(0),
      listStyle: 'none',
      display: 'flex !important',
      '& li': {
        margin: theme.spacing(0, 1.5, 0, 0),
        width: theme.spacing(2),
        height: theme.spacing(2),
        borderRadius: 20,
        transition: 'all 0.3s ease-out',
        overflow: 'hidden',
        '& button': {
          width: '100%',
          height: '100%',
          border: 'none',
          fontSize: 0,
          display: 'block',
          backgroundColor: hexToRgba(theme.palette.primary.main, 0.5),
          cursor: 'pointer',
        },
        '&.slick-active': {
          '& button': {
            opacity: 1,
            cursor: 'inherit',
            backgroundColor: theme.palette.primary.main,
          },
        },
      },
    },
  },
  [theme.breakpoints.down('md')]: {
    '&.carousel': {
      marginTop: theme.spacing(3),
    },
    '& .slick-slider': {
      '& .slick-list': {
        '& .slick-track': {
          '& .slick-slide': {
            '& .items': {
              '&.carousel-product': {
                padding: theme.spacing(0, 1),
              },
              '&.carousel-image': {
                '& .MuiTypography-root': {
                  fontSize: theme.spacing(3.6),
                },
              },
            },
          },
        },
      },
    },
    [theme.breakpoints.down('sm')]: {
      '& .slick-slider': {
        '& .slick-list': {
          '& .slick-track': {
            '& .slick-slide': {
              '& .items': {
                '&.carousel-image': {
                  height: theme.spacing(25),
                  '& .MuiTypography-root': {
                    fontSize: theme.spacing(3),
                  },
                },
              },
            },
          },
        },
        '& .slick-dots': {
          left: theme.spacing(-2),
          '& li': {
            margin: theme.spacing(0, 1.2, 0, 0),
            width: theme.spacing(1.7),
            height: theme.spacing(1.7),
          },
        },
      },
    },
  },
}))

export const StyledBoxCarouselThumb = styled(Box)(({ theme }) => ({
  position: 'relative',
  '& .slick-slider': {
    position: 'relative',
    '& .slick-list': {
      overflow: 'hidden',
      borderRadius: theme.spacing(2),
      '& .slick-track': {
        display: 'flex',
        overflow: 'hidden',
        '& .slick-slide': {
          overflow: 'hidden',
          '&:first-of-type': {
            borderTopLeftRadius: theme.spacing(2),
            borderBottomLeftRadius: theme.spacing(2),
          },
          '&:last-of-type': {
            borderTopRightRadius: theme.spacing(2),
            borderBottomRightRadius: theme.spacing(2),
          },
          '&.slick-active': {
            zIndex: 9,
          },
          '& .items': {
            display: 'block !important',
            position: 'relative',
            paddingTop: '135%',
            '& img': {
              height: '100% !important',
              width: '100%',
              objectFit: 'cover',
            },
          },
        },
      },
    },
  },
}))

export const StyledBoxCarouselThumbs = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginTop: theme.spacing(2),
  overflow: 'hidden',
  '& .slick-slider': {
    position: 'relative',
    margin: theme.spacing(0, -0.8),
    '& .slick-list': {
      overflow: 'hidden',
      '& .slick-track': {
        display: 'flex',
        overflow: 'hidden',
        '& .slick-slide': {
          padding: theme.spacing(0, 1),
          '&.slick-active': {
            zIndex: 9,
          },
          '& .items': {
            display: 'block !important',
            position: 'relative',
            paddingTop: '120%',
            borderRadius: theme.spacing(2),
            overflow: 'hidden',
            cursor: 'pointer',
            '& img': {
              height: '100% !important',
              width: '100%',
              objectFit: 'cover',
            },
          },
        },
      },
    },
  },
  '& .slick-arrow': {
    position: 'absolute',
    zIndex: 9,
    top: '50%',
    transform: 'translateY(-50%)',
    borderRadius: '50%',
    cursor: 'pointer',
    '& .wrapper-svg': {
      '& svg': {
        width: `${theme.spacing(5)} !important`,
        height: `${theme.spacing(5)} !important`,
      },
    },
    '&.prev': {
      left: 0,
      '& .wrapper-svg': {
        transform: 'rotate(180deg)',
      },
    },
    '&.next': {
      right: 0,
    },
  },
  [theme.breakpoints.down('md')]: {
    '& .slick-slider': {
      '& .slick-list': {
        '& .slick-track': {
          '& .slick-slide': {
            '& .items': {
              borderRadius: theme.spacing(1),
            },
          },
        },
      },
    },
  },
}))

export const StyledArrowCarousel = styled(Box)(({ theme }) => ({
  '&.slick-next, &.slick-prev': {
    position: 'absolute',
    top: '50%',
    transform: `translate(0, -50%)`,
    zIndex: 9,
    boxShadow,
    borderRadius: '50%',
    '& .wrapper-svg': {
      '& svg': {
        cursor: 'pointer',
      },
      '&.light': {
        '& svg circle': {
          fill: theme.palette.primary.main,
        },
        '& svg path': {
          fill: theme.palette.secondary.main,
        },
      },
    },
  },
  '&.slick-next': {
    right: `-${arrowSize / 2}px`,
  },
  '&.slick-prev': {
    left: `-${arrowSize / 2}px`,
    '& .wrapper-svg': {
      transform: 'rotate(180deg)',
    },
  },
}))

export const StyledIconButtonCarousel = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.main,
  padding: 0,
  margin: theme.spacing(0, 2),
  '& .MuiSvgIcon-root': {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.grey[200],
  },
}))
