import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Reset from './pages/reset/Reset';
import { AppBar, Box, CssBaseline, Divider, Link, Toolbar } from '@mui/material';
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
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box display={'flex'} flexDirection={'column'} height={'100vh'} overflow={'hidden'}>
        {/* <AppBar color='transparent' position="sticky" elevation={0}>
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
        </AppBar> */}
        <Box
          flexBasis={'100%'}
        >
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Root />} />
              <Route element={<AuthGuard />}>
                <Route path='/acceuil' element={<Home />} />
              </Route>
              <Route path='/connecter' element={<Login />} />
              <Route path='/creer' element={<Register />} />
              <Route path='/reinitialiser' element={<Reset />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
