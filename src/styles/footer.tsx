import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const heightIcon = 30
export const StyledFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0, 0),
  borderTop: `1px solid ${theme.palette.divider}`,
  '& .MuiTypography-root': {
    '&.text': {
      lineHeight: 1.3,
      fontSize: theme.spacing(1.8),
    },
    '& a': {
      textDecoration: 'none',
      color: theme.palette.secondary.main,
    },
    '&.copy': {
      padding: theme.spacing(6, 0),
      marginTop: theme.spacing(4),
      textAlign: 'center',
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
      fontSize: theme.spacing(1.8),
    },
  },
  '& .MuiButtonBase-root': {
    minWidth: 'inherit',
    width: '100%',
    marginBottom: theme.spacing(3),
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4, 0, 0),
    '& .MuiButtonBase-root': {
      marginBottom: theme.spacing(2),
    },
    '& .MuiTypography-root': {
      '&.copy': {
        padding: theme.spacing(4, 0),
        marginTop: theme.spacing(2),
      },
    },
  },
  [theme.breakpoints.down('sm')]: {
    paddingBottom: theme.spacing(8),
  },
}))
