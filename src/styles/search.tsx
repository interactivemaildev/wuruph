import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledBoxSearch = styled(Box)(({ theme }) => ({
  '& .MuiTextField-root': {
    flexGrow: 1,
    padding: 0,
    backgroundColor: 'transparent',
    maxWidth: theme.spacing(25),
    width: '100%',
    '& .MuiOutlinedInput-root': {
      height: theme.spacing(5),
      borderRadius: theme.spacing(3),
      color: theme.palette.secondary.main,
      '& .MuiOutlinedInput-input': {
        textAlign: 'center',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: `2px !important`,
        '&.Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: `2px !important`,
          },
        },
      },
    },
  },
  [theme.breakpoints.down('md')]: {
    '& .MuiTextField-root': {
      '& .MuiOutlinedInput-root': {
        height: theme.spacing(4.4),
        '& .MuiOutlinedInput-input': {
          fontSize: theme.spacing(1.8),
        },
      },
    },
  },
}))
