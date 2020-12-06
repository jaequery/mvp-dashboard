import { useEffect, useState } from 'react';
import { useApi } from './api.hooks';
import Router from 'next/router';
import Cookies from 'js-cookie';

export function useUser() {
  const userRes = useApi('get', '/users/me');
  const [login, loginRes] = useApi('post', '/auth/login');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userRes && userRes.data) {
      setUser(userRes.data);
    }
  }, [userRes]);

  useEffect(() => {
    if (loginRes.isSuccess) {
      Cookies.set('accessToken', loginRes.data.data.accessToken, {
        path: '/',
      });
      Router.push('/');
    }
  }, [loginRes]);

  const logout = () => {
    Cookies.set('accessToken', null);
    Router.push('/signin');
  };

  return { user, userRes, login, loginRes, logout };
}

export function useUserForgotPassword() {
  const [forgot, forgotRes] = useApi('post', '/auth/forgot-password');
  return { forgot, forgotRes };
}

export function useUserResetPassword() {
  const [reset, resetRes] = useApi('post', '/auth/reset-password');
  return { reset, resetRes };
}
