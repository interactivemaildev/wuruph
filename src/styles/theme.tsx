import { createTheme } from '@mui/material/styles'

export const heightHeader = 80
export const borderRadius = 2
export const boxShadow = `0 3px 5px 0 rgba(0, 0, 0, 0.1)`

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#000000',
    },
    info: {
      main: '#F4A259',
    },
    grey: {
      '100': '#f7f9f9',
    },
    error: {
      main: '#DD614A',
    },
    success: {
      main: '#4B7F52',
    },
    text: {
      primary: '#000000',
    },
  },
  typography: {
    body1: {
      fontSize: 16,
    },
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: () => ({
        body: {
          '&.sr .load-hidden': {
            visibility: 'hidden',
          },
        },
      }),
    },
  },
})

export default theme
