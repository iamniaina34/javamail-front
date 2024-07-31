import React from 'react';
import { useCookies } from 'react-cookie';
import { Navigate, Outlet } from 'react-router-dom';

function AuthGuard() {
  const [cookies] = useCookies(['userId']);
  const isAuthenticated = !!cookies.userId;
  return isAuthenticated ? <Outlet /> : <Navigate to='/connecter' />;
}

export default AuthGuard;