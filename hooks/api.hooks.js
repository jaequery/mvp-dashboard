import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useMutation, useQuery, useQueryCache } from 'react-query';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosConfig = {
  baseURL: baseUrl,
  headers: {},
};

export const useApiPost = (url, opts = { queryKey: '' }) => {
  const cache = useQueryCache();
  const [accessToken, setAccessToken] = useState(Cookies.get('accessToken'));
  if (accessToken) {
    axiosConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  return useMutation(
    (payload) => {
      return axios.post(url, payload, axiosConfig);
    },
    {
      onSuccess: () => {
        const key = opts.queryKey ? opts.queryKey : url;
        cache.invalidateQueries(key);
      },
    },
  );
};

export const useApiPatch = (url, opts = { queryKey: null }) => {
  const cache = useQueryCache();
  const [accessToken, setAccessToken] = useState(Cookies.get('accessToken'));
  if (accessToken) {
    axiosConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  return useMutation(
    (payload) => {
      return axios.patch(url, payload, axiosConfig);
    },
    {
      onSuccess: () => {
        const key = opts.queryKey ? opts.queryKey : url;
        cache.invalidateQueries(key);
      },
    },
  );
};

export const useApiDelete = (url, opts = { queryKey: '' }) => {
  const cache = useQueryCache();
  const [accessToken, setAccessToken] = useState(Cookies.get('accessToken'));
  if (accessToken) {
    axiosConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  return useMutation(
    (payload) => {
      return axios.delete(url, payload, axiosConfig);
    },
    {
      onSuccess: () => {
        const key = opts.queryKey ? opts.queryKey : url;
        cache.invalidateQueries(key);
      },
    },
  );
};

export const useApiGet = (url, opts = { enabled: false, queryKey: null }) => {
  const key = opts.queryKey ? opts.queryKey : url;
  const [accessToken, setAccessToken] = useState(Cookies.get('accessToken'));

  if (accessToken) {
    axiosConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  const res = useQuery(
    key,
    async () => {
      const { data } = await axios.get(url, axiosConfig);
      return data;
    },
    opts,
  );

  return [res.refetch, res];
};
