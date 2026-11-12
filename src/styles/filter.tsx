import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledFilter = styled(Box)(({ theme }) => ({}))

export const StyledFilterGender = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  borderTop: `1px solid ${theme.palette.secondary.main}`,
  borderLeft: `1px solid ${theme.palette.secondary.main}`,
  marginBottom: theme.spacing(4),
  '& .MuiButtonBase-root': {
    width: '50%',
    border: `1px solid ${theme.palette.secondary.main}`,
    borderTop: 'none',
    borderLeft: 'none',
    borderRadius: 0,
    display: 'block',
    padding: theme.spacing(1),
    textTransform: 'capitalize',
    '& .wrapper-svg': {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(0.5),
    },
    '& span': {
      display: 'block',
      lineHeight: 1.2,
      marginTop: theme.spacing(1),
      '&.MuiTouchRipple-root': {
        marginTop: 0,
      },
    },
    '&.active': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
      '& svg path, & svg rect': {
        fill: theme.palette.primary.main,
      },
    },
  },
}))

export const StyledFilterCategories = styled(Box)(({ theme }) => ({
  '& .MuiFormGroup-root': {
    marginTop: theme.spacing(1),
    '& .MuiFormControlLabel-root': {
      marginRight: 0,
      '& .MuiButtonBase-root': {
        '& .MuiSvgIcon-root': {
          fill: theme.palette.secondary.main,
        },
      },
    },
  },
  [theme.breakpoints.down('md')]: {
    '& .MuiFormGroup-root': {
      '& .MuiButtonBase-root': {
        padding: 6,
      },
      '& .MuiTypography-root': {
        fontSize: theme.spacing(1.8),
      },
    },
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(3),
    '& .MuiFormGroup-root': {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      '& .MuiFormControlLabel-root': {
        marginLeft: 0,
        marginRight: theme.spacing(1),
      },
    },
  },
}))
