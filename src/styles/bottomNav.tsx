import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { boxShadow } from 'src/styles/theme'

const fontSize = 13
export const StyledBottomNav = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  zIndex: 99999,
  borderTop: `1px solid ${theme.palette.grey[200]}`,
  '& .MuiBottomNavigation-root': {
    height: 'auto',
    position: 'relative',
    '& .MuiButtonBase-root': {
      position: 'relative',
      minWidth: 50,
      paddingLeft: 3,
      paddingRight: 3,
      paddingTop: 6,
      paddingBottom: 8,
      '& .icon': {
        position: 'relative',
        '& img': {
          position: 'relative !important',
          width: `28px !important`,
          height: `28px !important`,
          '&.selected': {
            position: 'absolute !important',
            top: 0,
            left: 0,
            opacity: 0,
          },
        },
      },
      '&.Mui-selected': {
        paddingTop: 6,
        '& .icon': {
          '& img': {
            '&.selected': {
              opacity: 1,
            },
          },
        },
      },
      '& .MuiBottomNavigationAction-label': {
        fontWeight: 400,
        paddingTop: 0,
        height: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize,
        color: theme.palette.grey[500],
        textTransform: 'capitalize',
        '&.Mui-selected': {
          color: theme.palette.text.primary,
          fontSize,
        },
      },
    },
  },
  '& .popper': {
    boxShadow,
    backgroundColor: theme.palette.secondary.main,
    position: 'relative',
    '&:before': {
      content: `''`,
      position: 'absolute',
      top: '100%',
      left: '50%',
      width: 0,
      height: 0,
      borderLeft: `6px solid transparent`,
      borderRight: `6px solid transparent`,
      borderTop: `6px solid ${theme.palette.secondary.main}`,
      transform: 'translateX(-50%)',
    },
    '& .MuiButtonBase-root': {
      padding: theme.spacing(0.5, 2),
      textDecoration: 'none',
      color: theme.palette.primary.main,
      minHeight: 'inherit',
      fontSize,
    },
  },
}))
