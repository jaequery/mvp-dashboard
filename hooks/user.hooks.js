import Cookies from 'js-cookie';
import Router from 'next/router';
import { useEffect, useState } from 'react';

import { useApiGet, useApiPost } from './api.hooks';

export function useUser() {
  const [getUser, userRes] = useApiGet('/users/me');
  return [getUser, userRes];
}

export function useUserLogin() {
  const [login, loginRes] = useApiPost('/auth/login');

  useEffect(() => {
    if (loginRes.isSuccess) {
      Cookies.set('accessToken', loginRes.data.data.accessToken, {
        path: '/',
      });
      Router.push('/');
    }
  }, [loginRes]);

  return [login, loginRes];
}

export function useUserLogout() {
  const logout = () => {
    Cookies.set('accessToken', null);
    Router.push('/signin');
  };
  return [logout];
}

export function useUserForgotPassword() {
  const [forgot, forgotRes] = useApiPost('/auth/forgot-password');
  return { forgot, forgotRes };
}

export function useUserResetPassword() {
  const [reset, resetRes] = useApiPost('/auth/reset-password');
  return { reset, resetRes };
}
