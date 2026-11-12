import { Box, TextField } from '@mui/material'
import hexToRgba from 'hex-to-rgba'
import { styled } from '@mui/material/styles'

export const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.grey.A100,
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1),
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.secondary.main,
    },
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.secondary.main,
      },
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: '1px',
        borderColor: theme.palette.secondary.main,
      },
    },
    '&.Mui-error': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.error.main,
      },
    },
    '&.Mui-disabled': {
      '& input': {
        textFillColor: hexToRgba(theme.palette.secondary.main, 0.8),
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: hexToRgba(theme.palette.secondary.main, 0.5),
      },
    },
    '& input': {
      paddingTop: 0,
      paddingBottom: 0,
      '&:focus::placeholder': {
        color: 'transparent',
      },
    },
  },
}))

export const StyledButton = styled(Box)(({ theme }) => ({
  '& a': {
    display: 'block',
    textDecoration: 'none',
  },
  '& .MuiButton-root': {
    textTransform: 'none',
    lineHeight: 'inherit',
    padding: theme.spacing(0, 2),
    height: theme.spacing(5.5),
    minWidth: theme.spacing(23),
    borderRadius: theme.spacing(3),
    fontWeight: 600,
    '&.MuiButton-contained': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
      '&:hover': {
        backgroundColor: hexToRgba(theme.palette.secondary.main, 0.9),
      },
    },
    '&.MuiButton-outlined': {
      border: `2px solid ${theme.palette.secondary.main}`,
      color: theme.palette.secondary.main,
      '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.main,
      },
    },
  },
  [theme.breakpoints.down('md')]: {
    '& .MuiButton-root': {
      height: theme.spacing(4.5),
      minWidth: theme.spacing(18),
      fontSize: theme.spacing(1.6),
    },
  },
}))
