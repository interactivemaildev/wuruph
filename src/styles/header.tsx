import { AppBar, Box, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'
import { boxShadow } from 'src/styles/theme'

export const StyledAppBarHeader = styled(AppBar)(({ theme }) => ({
  minHeight: 80,
  display: 'flex',
  justifyContent: 'center',
  zIndex: theme.zIndex.drawer - 1,
  boxShadow,
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  [theme.breakpoints.down('md')]: {
    minHeight: 60,
  },
}))

export const StyledBoxHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(0.5, 2),
  position: 'relative',
  '& a.logo': {
    display: 'block',
    textDecoration: 'none',
  },
  '& .menu': {
    display: 'flex',
    margin: theme.spacing(0, 2),
    padding: theme.spacing(0, 0, 0, 6),
    '& a, & p': {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: theme.spacing(0, 1),
      padding: theme.spacing(1, 2.5),
      textTransform: 'capitalize',
      textDecoration: 'none',
      color: theme.palette.secondary.main,
      '&:before': {
        content: `''`,
        position: 'absolute',
        bottom: 0,
        left: '50%',
        width: theme.spacing(0.85),
        height: theme.spacing(0.85),
        backgroundColor: '#1565c0',
        borderRadius: '50%',
        transform: 'translateX(-50%)',
        opacity: 0,
      },
      '&.selected': {
        color: '#1565c0',
        '&:before': {
          opacity: 1,
        },
      },
    },
    '& p': {
      cursor: 'pointer',
      '&:before': {
        transform: 'translateX(-16px)',
      },
    },
  },
  [theme.breakpoints.down('md')]: {
    padding: 0,
    '& .menu': {
      position: 'fixed',
      top: 0,
      left: 0,
      opacity: 0,
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100%',
      height: 0,
      backgroundColor: theme.palette.primary.main,
      margin: 0,
      zIndex: -1,
      pointerEvent: 'none',
      padding: theme.spacing(0, 3, 3),
      transition: `all 0.3s ease-in-out`,
      overflow: 'hidden',
      '& a, & p': {
        margin: theme.spacing(1, 0),
        padding: 0,
        textTransform: 'uppercase',
        letterSpacing: theme.spacing(0.2),
        '&:before': {
          display: 'none',
        },
      },
      '&.show': {
        opacity: 1,
        pointerEvent: 'all',
        height: '100%',
        zIndex: 9,
      },
      '& .submenu': {
        marginBottom: theme.spacing(1.5),
        '& a': {
          margin: theme.spacing(0.3, 0),
          padding: 0,
          minHeight: 32,
          textTransform: 'capitalize',
          fontSize: theme.spacing(1.8),
          letterSpacing: theme.spacing(0.1),
          backgroundColor: 'transparent',
          '& .MuiTouchRipple-root': {
            display: 'none',
          },
        },
      },
      '& .header-mobile': {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        padding: theme.spacing(0.6, 3),
        '& a': {
          margin: 0,
        },
      },
    },
    '& .MuiIconButton-root': {
      backgroundColor: theme.palette.grey[200],
      marginLeft: theme.spacing(2),
      height: theme.spacing(4.4),
      width: theme.spacing(4.4),
      '& .MuiSvgIcon-root': {
        height: theme.spacing(2.5),
        width: theme.spacing(2.5),
      },
    },
  },
}))

export const StyledPaper = styled(Paper)(({ theme }) => ({
  boxShadow,
  backgroundColor: theme.palette.secondary.main,
  minWidth: theme.spacing(20),
  '& .MuiButtonBase-root': {
    color: theme.palette.primary.main,
  },
}))
