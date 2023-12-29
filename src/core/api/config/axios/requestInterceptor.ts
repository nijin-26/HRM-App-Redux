import { AxiosError, AxiosRequestConfig } from "axios";
// import { getAccessToken } from '../../pages/Auth/helper';

export const onRequest = (config: AxiosRequestConfig) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoiYWJoaWIiLCJpYXQiOjE3MDM4Mjk4ODUsImV4cCI6MTcwMzgzMzQ4NX0.5YVvIahNnDMZls2bWzgP5-NDgvMkZNOwGLdOmU4mq2E";
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
