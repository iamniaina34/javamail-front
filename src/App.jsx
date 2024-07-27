import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Reset from './pages/reset/Reset';
import { AppBar, Box, CssBaseline, Divider, Link, Toolbar, Typography } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import Root from './pages/root/Root';
import { darkTheme } from './themes/theme';
import AppTitle from './components/AppTitle';
import CustomSwitch from './components/CustomSwitch';
import AuthGuard from './utilities/middleware/AuthGuard';
import { useCookies } from 'react-cookie';

function App() {
  const [cookies, setCookie] = useCookies(['isDarkTheme'])

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box display={'flex'} flexDirection={'column'} height={'100vh'} overflow={'hidden'}>
          <AppBar color='transparent' position="sticky" elevation={0}>
            <Toolbar
              disableGutters
              sx={{
                paddingX: '16px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <Box>
                <Link href='/' underline='none'>
                  <AppTitle size='small' />
                </Link>
              </Box>
              <Box display={'flex'} flexDirection={'row-reverse'} gap='4px'>
              </Box>
            </Toolbar>
            <Divider />
          </AppBar>
          <Box
            flexBasis={'100%'}
            display={'flex'}
            flexDirection={'column'}
          >
            <Routes>
              <Route element={<AuthGuard />}>
                <Route path='/acceuil' element={<Home />} />
              </Route>
              <Route path='*' element={
                <Box
                  maxWidth={'lg'}
                  height={'100%'}
                  m={'auto'}
                  display={'flex'}
                  flexDirection={'row'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  sx={{
                    [darkTheme.breakpoints.down('md')]: {
                      height: 'fit-content',
                      my: 4,
                    }
                  }}
                >
                  <Box
                    sx={{
                      m: 'auto',
                      width: 'fit-content',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      gap: 4,
                      p: 1,
                      [darkTheme.breakpoints.up('lg')]: {
                        borderColor: 'InactiveBorder',
                        borderRadius: 4,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        px: '20px',
                        display: 'none',
                        flexBasis: '64%',
                        [darkTheme.breakpoints.up('sm')]: {
                          display: 'flex',
                          flexDirection: 'column',
                          justifyItems: 'start',
                        },
                      }}
                    >
                      <AppTitle disableGutter />
                      <Typography
                        maxWidth='324px'
                        variant='body2'
                        align='justify'
                      >
                        Une application sans but exacte. Developpée par des ecervelés, pour les ecervelés, sauf celui qui nous corrigera bien-sûr.
                      </Typography>
                    </Box>
                    <Routes>
                      <Route path='/' element={<Root />} />
                      <Route path='/connecter' element={<Login />} />
                      <Route path='/creer' element={<Register />} />
                      <Route path='/reinitialiser' element={<Reset />} />
                      <Route path='*' exact={true} element={<Root />} />
                    </Routes>
                  </Box>
                </Box>

              } />
            </Routes>
          </Box>
        </Box>
      </ThemeProvider >
    </BrowserRouter>
  )
}

export default App;
