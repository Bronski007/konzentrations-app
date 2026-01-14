import React from 'react'

import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import { CssBaseline } from '@mui/material'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import AppLayout from './AppLayout'

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: defaultTheme => ({
        html: {
          width: '100%',
          height: '100%'
        },
        body: {
          width: '100%',
          height: '100%',
          background: defaultTheme.palette.grey[300]
        },
        '#app': {
          width: '100%',
          height: '100%'
        }
      })
    }
  }
})

const appTheme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
      light: 'rgb(101, 115, 195)',
      dark: 'rgb(44, 56, 126)',
      contrastText: '#fff'
    },
    secondary: { main: '#f50057' }
  }
})

const container = document.getElementById('app')
const root = createRoot(container)
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <ThemeProvider theme={appTheme}>
      <Router>
        <AppLayout />
      </Router>
    </ThemeProvider>
  </ThemeProvider>
)
