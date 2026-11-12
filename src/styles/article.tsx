import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { maxWidth } from 'src/styles/app'

export const StyledArticle = styled(Box)(({ theme }) => ({
  margin: theme.spacing(0, 'auto'),
  maxWidth: theme.spacing(maxWidth),
  '&.journal': {
    marginBottom: theme.spacing(8),
  },
  '& .MuiTypography-root': {
    '&.detail-title': {
      fontSize: theme.spacing(3.3),
      fontWeight: 700,
      lineHeight: 1.3,
    },
  },
  '& .text': {
    margin: theme.spacing(2, 0, 8),
    '& p, & h1, & h2, & h3, & h4, & h5, & h6, & ul, & ol': {
      marginTop: 0,
      marginBottom: theme.spacing(1.5),
    },
  },
  [theme.breakpoints.down('md')]: {
    '&.journal': {
      marginBottom: theme.spacing(4),
    },
    '& .MuiTypography-root': {
      '&.detail-title': {
        fontSize: theme.spacing(2.8),
      },
    },
    '& .text': {
      margin: theme.spacing(2, 0, 4),
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiTypography-root': {
      '&.detail-title': {
        fontSize: theme.spacing(2.4),
      },
    },
  },
}))

export const StyledVideo = styled(Box)(({ theme }) => ({
  margin: theme.spacing(4, 0, 8),
  backgroundColor: theme.palette.grey[100],
  '& .iframe': {
    display: 'flex',
    borderRadius: theme.spacing(1),
    overflow: 'hidden',
  },
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(2, 0, 4),
  },
}))
