import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useMutation, useQuery, useQueryCache } from 'react-query';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosConfig = {
  baseURL: baseUrl,
  headers: {},
};

export const useApi = (method, url) => {
  method = method.toLowerCase();
  const cache = useQueryCache();
  const key = url;

  const [accessToken, setAccessToken] = useState(Cookies.get('accessToken'));
  if (accessToken) {
    axiosConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  switch (method) {
    case 'post':
      return useMutation(
        (payload) => {
          return axios.post(url, payload, axiosConfig);
        },
        {
          onSuccess: () => {
            cache.invalidateQueries(key);
          },
        },
      );

    case 'patch':
      return useMutation(
        (payload) => {
          return axios.patch(url, payload, axiosConfig);
        },
        {
          onSuccess: () => {
            cache.invalidateQueries(key);
          },
        },
      );

    case 'delete':
      return useMutation(
        (payload) => {
          return axios.delete(url, payload, axiosConfig);
        },
        {
          onSuccess: () => {
            cache.invalidateQueries(key);
          },
        },
      );

    case 'get':
      return useQuery(key, async () => {
        const { data } = await axios.get(url, axiosConfig);
        return data;
      });
  }
};
