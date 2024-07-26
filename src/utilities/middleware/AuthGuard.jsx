import React from 'react';
import { useCookies } from 'react-cookie';
import { Navigate, Outlet } from 'react-router-dom';

function AuthGuard() {
  const [cookies] = useCookies(['usernameCookie']);
  const isAuthenticated = cookies.usernameCookie != null;
  return isAuthenticated ? <Outlet /> : <Navigate to='/connecter' />;
}

export default AuthGuard;