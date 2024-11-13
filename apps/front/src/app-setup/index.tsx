import React from 'react'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import { createTheme, ThemeProvider } from '@mui/material'

import Home from 'src/views/home'

const router = createBrowserRouter([{
  path: `*`,
  element: <Home />
}])

function App () {
  const theme = createTheme({
    typography: {
      fontFamily: `Inter, sans-serif`
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
