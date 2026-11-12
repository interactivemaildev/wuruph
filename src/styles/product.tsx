import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { maxWidth } from 'src/styles/app'

export const StyledCardProduct = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '& a.img': {
    position: 'relative',
    width: '100%',
    borderRadius: theme.spacing(2),
    overflow: 'hidden',
    display: 'block',
    border: 'none',
    '& img': {
      objectFit: 'cover',
      width: '100%',
      height: '100%',
    },
    '& span.MuiTypography-root': {
      position: 'absolute',
      top: theme.spacing(3),
      left: 0,
      zIndex: 99,
      borderTopRightRadius: 25,
      borderBottomRightRadius: 25,
      fontSize: theme.spacing(1.7),
      fontWeight: 500,
      padding: theme.spacing(1.2, 2),
      textTransform: 'none',
    },
    '& .wrapper-svg': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: theme.zIndex.tooltip,
    },
  },
  '& .box-content': {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '& .MuiTypography-root': {
      lineHeight: 1.3,
      '& a': {
        textDecoration: 'none',
        color: theme.palette.text.primary,
      },
      '&.title': {
        margin: theme.spacing(3, 0, 0),
        fontSize: theme.spacing(2.1),
      },
      '&.price': {
        marginTop: theme.spacing(1.5),
        fontSize: theme.spacing(1.8),
        fontWeight: 600,
      },
      '&.gender': {
        fontSize: theme.spacing(1.8),
        marginTop: theme.spacing(1.5),
        textTransform: 'capitalize',
        color: theme.palette.grey[600],
      },
    },
    '&.justify-start': {
      justifyContent: 'flex-start',
      '& .MuiTypography-root': {
        '&.title': {
          marginBottom: theme.spacing(2),
          fontWeight: 700,
          fontSize: theme.spacing(2.5),
        },
      },
    },
  },
  '&.horizontal': {
    flexDirection: 'row-reverse',
    '& a.img': {
      width: '50%',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    '& .box-content': {
      flexGrow: 0,
      width: '50%',
      paddingRight: theme.spacing(4),
      '&.justify-start': {
        justifyContent: 'center',
        '& .MuiTypography-root': {
          '&.title': {
            marginTop: 0,
            marginBottom: theme.spacing(2),
            fontSize: theme.spacing(3.5),
          },
        },
      },
    },
  },
  [theme.breakpoints.down('md')]: {
    '& a.img': {
      '& span.MuiTypography-root': {
        top: theme.spacing(2),
        fontSize: theme.spacing(1.6),
        padding: theme.spacing(1, 2),
      },
    },
    '& .box-content': {
      '& .MuiTypography-root': {
        '&.title': {
          margin: theme.spacing(2, 0, 0),
          fontSize: theme.spacing(1.8),
        },
        '&.price': {
          fontSize: theme.spacing(1.5),
        },
      },
      '&.justify-start': {
        '& .MuiTypography-root': {
          '&.title': {
            fontSize: theme.spacing(2),
          },
          '&.desc': {
            fontSize: theme.spacing(1.8),
          },
        },
      },
    },
    '&.horizontal': {
      '& .box-content': {
        '&.justify-start': {
          '& .MuiTypography-root': {
            '&.title': {
              fontSize: theme.spacing(2.6),
            },
          },
        },
      },
    },
  },
}))

export const StyledDetail = styled(Box)(({ theme }) => ({
  margin: theme.spacing(0, 'auto'),
  maxWidth: theme.spacing(maxWidth),
  '& .landing': {
    padding: 0,
  },
  '& .title-header': {
    fontWeight: 700,
    fontSize: theme.spacing(3.3),
    lineHeight: 1.3,
    paddingBottom: theme.spacing(1),
  },
  '& .price-desc': {
    fontWeight: 700,
    fontSize: theme.spacing(2.5),
    lineHeight: 1.3,
    margin: theme.spacing(0, 0, 3),
    color: '#1565c0',
  },
  [theme.breakpoints.down('md')]: {
    '& .title-header': {
      fontSize: theme.spacing(2.7),
      paddingBottom: theme.spacing(2),
    },
    '& .price-desc': {
      fontSize: theme.spacing(2.2),
      margin: theme.spacing(0, 0, 2),
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& .title-header': {
      fontSize: theme.spacing(2.3),
    },
    '& .price-desc': {
      fontSize: theme.spacing(2),
    },
  },
}))

export const StyledDescription = styled(Box)(({ theme }) => ({
  margin: theme.spacing(0, 0, 3),
  '& .title-desc': {
    marginBottom: theme.spacing(1),
    fontWeight: 700,
    fontSize: theme.spacing(2.3),
  },
  '& .text': {
    '&.pre-wrap': {
      whiteSpace: 'pre-wrap',
    },
    '& p, & h1, & h2, & h3, & h4, & h5, & h6, & ul, & ol': {
      marginTop: 0,
      marginBottom: theme.spacing(0.7),
    },
  },
  [theme.breakpoints.down('md')]: {
    margin: theme.spacing(0, 0, 2),
    '& .title-desc': {
      fontSize: theme.spacing(2),
    },
    '& .text': {
      '& p, & h1, & h2, & h3, & h4, & h5, & h6, & ul, & ol': {
        fontSize: theme.spacing(1.8),
      },
    },
  },
}))
