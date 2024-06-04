import axios, { AxiosInstance } from 'axios';
import { API_URL } from '../constants';

const getToken = (): string | null => {
  return localStorage.getItem('token');
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
