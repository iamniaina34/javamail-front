import React, { useState } from 'react'
import Login from './pages/login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Register from './pages/register/Register'
import Reset from './pages/reset/Reset'
import { createTheme, CssBaseline } from '@mui/material'
import { ThemeProvider } from '@emotion/react'

function App() {
  const [mode, setMode] = useState('light')
  const theme = createTheme({
    palette: {
      mode: mode
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/connecter' element={<Login />} />
          <Route path='/creer' element={<Register />} />
          <Route path='/reinitialiser' element={<Reset />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App