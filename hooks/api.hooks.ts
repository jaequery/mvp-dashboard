import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const headers = {};
const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers,
});
export default axiosInstance;

export const api = (method, url) => {
  switch (method.toLowerCase()) {
    case 'post':
      return useMutation((payload) => {
        return axiosInstance.post(url, payload);
      });

    case 'patch':
      return useMutation((payload) => {
        return axiosInstance.patch(url, payload);
      });

    case 'delete':
      return useMutation((payload) => {
        return axiosInstance.delete(url, payload);
      });

    case 'get':
      return useQuery(url, async () => {
        const res = await axiosInstance.get(url);
        return res.data;
      });
  }
};
