import { AxiosError, AxiosRequestConfig } from "axios";
// import { getAccessToken } from '../../pages/Auth/helper';

export const onRequest = (config: AxiosRequestConfig) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoiYWJoaWIiLCJpYXQiOjE3MDQxODY0NzcsImV4cCI6MTcwNDE5MDA3N30.JZQrqCtbaYfXVNOfexUhmoLQe1mSGF9oQLWWIoN6E8E";
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  config.headers = {
    "Content-type": "application/json",
    ...config.headers,
    ...headers,
  };
  return config;
};

export const onRequestError = (error: AxiosError): Promise<AxiosError> =>
  Promise.reject(error);
