import { Box, Breadcrumbs } from '@mui/material'
import { styled } from '@mui/material/styles'
import { arrowSize } from 'src/core/components/Carousel'

export const StyledComponent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  paddingTop: 80,
  [theme.breakpoints.down('md')]: {
    paddingTop: 60,
  },
}))

export const StyledTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& .MuiTypography-root': {
    fontWeight: 700,
    '&.large': {
      fontSize: theme.spacing(2.7),
    },
    '&.small': {
      fontSize: theme.spacing(2.1),
    },
  },
  [theme.breakpoints.down('md')]: {
    '& .MuiTypography-root': {
      '&.large': {
        fontSize: theme.spacing(2.2),
      },
      '&.small': {
        fontSize: theme.spacing(1.9),
      },
    },
  },
}))

export const StyledSignature = styled(Box)(({ theme }) => ({
  margin: theme.spacing(6, 'auto', 0),
  maxWidth: '88%',
  '&.video': {
    maxWidth: theme.spacing(92),
    '& .title-component': {
      padding: theme.spacing(0),
    },
  },
  '&.journal': {
    marginBottom: theme.spacing(8),
  },
  '& .title-component': {
    padding: theme.spacing(0, 2),
  },
  '& .carousel': {
    marginTop: theme.spacing(3),
    paddingBottom: theme.spacing(7),
    '& .slick-next': {
      right: `-${arrowSize + 5}px`,
    },
    '& .slick-prev': {
      left: `-${arrowSize + 5}px`,
    },
    '& .slick-dots': {
      left: theme.spacing(-3),
      top: '100%',
      transform: `translateY(${theme.spacing(1)})`,
      '& li': {
        '& button': {
          backgroundColor: `rgba(0, 0, 0, 0.2) !important`,
        },
        '&.slick-active': {
          '& button': {
            backgroundColor: `${theme.palette.secondary.main} !important`,
          },
        },
      },
    },
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: 'inherit',
    margin: theme.spacing(3, 0, 0),
    '&.video': {
      maxWidth: 'inherit',
      margin: theme.spacing(0),
    },
  },
}))

export const maxWidth = 123
export const StyledInner = styled(Box)(({ theme }) => ({
  margin: theme.spacing(0, 'auto'),
  maxWidth: theme.spacing(maxWidth),
  '& .header': {
    paddingTop: theme.spacing(1.3),
    paddingBottom: theme.spacing(1.3),
    '&.border': {
      borderLeft: `1px solid ${theme.palette.divider}`,
      paddingLeft: theme.spacing(4),
    },
  },
  '& .products': {
    paddingLeft: theme.spacing(4),
  },
  '& .MuiGrid-container': {
    '& .MuiGrid-item': {
      '&.first-grid': {
        position: 'relative',
        '&:before': {
          content: `''`,
          position: 'absolute',
          right: theme.spacing(-3),
          top: 0,
          height: '100%',
          width: 1,
          backgroundColor: theme.palette.divider,
        },
      },
    },
  },
  [theme.breakpoints.down('md')]: {
    '& .header': {
      '&.border': {
        paddingLeft: theme.spacing(2),
      },
    },
    '& .products': {
      paddingLeft: theme.spacing(2),
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& .products': {
      paddingLeft: theme.spacing(0),
    },
  },
}))

export const StyledRecommendation = styled(Box)(({ theme }) => ({
  margin: theme.spacing(6, 'auto', 8),
  maxWidth: theme.spacing(maxWidth),
  [theme.breakpoints.down('md')]: {
    margin: theme.spacing(3, 'auto', 4),
  },
}))

export const StyledAdvantages = styled(Box)(({ theme }) => ({
  '& .MuiGrid-container': {
    '& .MuiGrid-item': {
      '& .item-icon': {
        textAlign: 'center',
        position: 'relative',
        padding: theme.spacing(5, 0, 7),
        '&:before': {
          content: `''`,
          position: 'absolute',
          top: 0,
          left: theme.spacing(-1),
          width: 1,
          height: '100%',
          backgroundColor: theme.palette.divider,
        },
        '& .wrapper-svg': {
          display: 'flex',
          justifyContent: 'center',
          marginBottom: theme.spacing(4),
        },
        '& .MuiTypography-root': {
          fontSize: theme.spacing(2.2),
          fontWeight: 700,
        },
      },
      '&:first-of-type': {
        '& .item-icon': {
          '&:before': {
            display: 'none',
          },
        },
      },
    },
  },
  [theme.breakpoints.down('md')]: {
    '& .MuiGrid-container': {
      '& .MuiGrid-item': {
        '& .item-icon': {
          '& .MuiTypography-root': {
            fontSize: theme.spacing(1.7),
          },
        },
        '&:nth-of-type(3)': {
          '& .item-icon': {
            '&:before': {
              display: 'none',
            },
          },
        },
      },
    },
  },
}))

export const StyledLanding = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  '&.article': {
    paddingBottom: theme.spacing(4),
  },
  '& .image': {
    position: 'relative',
    marginTop: theme.spacing(4),
    borderRadius: theme.spacing(2.5),
    paddingTop: '23%',
    overflow: 'hidden',
    '& img': {
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
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2, 0),
    '& .image': {
      marginTop: theme.spacing(2),
      paddingTop: '27%',
      '& .MuiTypography-root': {
        fontSize: theme.spacing(3.6),
      },
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& .image': {
      paddingTop: '30%',
      '& .MuiTypography-root': {
        fontSize: theme.spacing(3.3),
      },
    },
  },
}))

export const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontWeight: 700,
  },
  '& .MuiBreadcrumbs-separator': {
    margin: theme.spacing(0, 0.4),
    color: theme.palette.grey[500],
  },
}))

export const StyledPagination = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '& .nextPrev': {
    display: 'flex',
    '& .MuiButtonBase-root': {
      padding: 0,
      margin: theme.spacing(0, 2.5),
      '&.prev': {
        '& .wrapper-svg': {
          transform: 'rotate(180deg)',
        },
      },
      '&.Mui-disabled': {
        '& svg circle': {
          fill: theme.palette.grey[600],
        },
      },
    },
  },
  '& .MuiPagination-root': {
    margin: theme.spacing(3, 0, 0),
    '& .MuiTypography-root': {
      height: theme.spacing(3),
      minWidth: theme.spacing(2),
      margin: theme.spacing(0.5),
      textAlign: 'center',
      cursor: 'pointer',
      fontWeight: 700,
      color: theme.palette.grey[600],
      '&.ellipsis': {
        cursor: 'default',
      },
      '&.selected': {
        color: theme.palette.grey[900],
      },
    },
  },
}))

export const StyledCustom = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(6, 0),
  '& .text': {
    margin: theme.spacing(3, 0, 0),
    '& p, & h1, & h2, & h3, & h4, & h5, & h6, & ul, & ol': {
      marginTop: 0,
      marginBottom: theme.spacing(0.7),
    },
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3, 0),
  },
}))

export const StyledFormCustom = styled(Box)(({ theme }) => ({
  '& .MuiFormLabel-root': {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
    color: theme.palette.secondary.main,
    '& span': {
      color: theme.palette.error.main,
    },
  },
  '& .MuiFormControl-root': {
    backgroundColor: 'transparent',
    '& .MuiInputBase-root': {
      '& input': {
        paddingTop: theme.spacing(1.2),
        paddingBottom: theme.spacing(1.2),
      },
    },
  },
  [theme.breakpoints.down('md')]: {
    '& .MuiFormLabel-root': {
      fontSize: theme.spacing(1.8),
    },
    '& .MuiFormControl-root': {
      marginBottom: theme.spacing(1.2),
      '& .MuiInputBase-root': {
        '& input': {
          fontSize: theme.spacing(1.8),
          paddingTop: theme.spacing(1),
          paddingBottom: theme.spacing(1),
        },
      },
    },
  },
}))

export const heightButton = 26
export const StyledShare = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: theme.spacing(0, 0, 3),
  '& .MuiTypography-root': {
    marginRight: theme.spacing(1),
  },
  '& .custom-button': {
    display: 'flex',
  },
  '& button': {
    position: 'relative',
    marginLeft: theme.spacing(1),
    borderRadius: '50%',
    padding: 0,
    border: 'none',
    overflow: 'hidden',
    width: heightButton,
    height: heightButton,
    '& svg': {
      '& rect': {
        fill: theme.palette.secondary.main,
      },
      '& path': {
        fill: theme.palette.primary.main,
      },
    },
    '&.img': {
      backgroundColor: theme.palette.secondary.main,
      cursor: 'pointer',
    },
    '& img': {
      transform: 'scale(0.6)',
    },
  },
}))
