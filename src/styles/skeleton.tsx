import { Skeleton } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  '&.slider': {
    marginTop: theme.spacing(6),
  },
  '&.text': {
    margin: theme.spacing(2, 0, 0),
  },
  '&.text-footer': {
    marginBottom: theme.spacing(1),
  },
  '&.text-categories': {
    margin: theme.spacing(1.5, 0),
  },
  [theme.breakpoints.down('md')]: {
    '&.slider': {
      marginTop: theme.spacing(3),
    },
    '&.text': {
      margin: theme.spacing(1.5, 0, 0),
    },
  },
}))
