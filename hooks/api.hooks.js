import axios from 'axios';
import { useMutation, useQuery, useQueryCache, QueryCache } from 'react-query';
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const headers = {};
import Cookies from 'js-cookie';
const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${Cookies.get('accessToken')}`,
  },
});
export default axiosInstance;

export const api = (method, url) => {
  method = method.toLowerCase();
  const cache = useQueryCache();
  const key = url;

  switch (method) {
    case 'post':
      return useMutation(
        (payload) => {
          return axiosInstance.post(url, payload);
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
          return axiosInstance.patch(url, payload);
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
          return axiosInstance.delete(url, payload);
        },
        {
          onSuccess: () => {
            cache.invalidateQueries(key);
          },
        },
      );

    case 'get':
      return useQuery(key, async () => {
        const res = await axiosInstance.get(url);
        return res.data;
      });
  }
};
