import { extendTheme } from '@mui/joy'

const theme = extendTheme({
  fontFamily: {
    body: 'Arimo, sans-serif',
    display: 'Arimo, sans-serif',
  },
  typography: {
    display1: {
      color: '#8b8685',
    },
    display2: {
      color: '#8b8685',
    },
  },
})

export type Theme = typeof theme

export default theme
