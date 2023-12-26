import { AxiosError, AxiosRequestConfig } from 'axios';
// import { getAccessToken } from '../../pages/Auth/helper';

export const onRequest = (config: AxiosRequestConfig) => {
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoiYWJoaWIiLCJpYXQiOjE3MDM2Mjg3NzksImV4cCI6MTcwMzYzMjM3OX0.x3SpXgnakTFFls950jdvGyHfbkgRWpEE0k7NxeJ7llA';
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    config.headers = {
        'Content-type': 'application/json',
        ...config.headers,
        ...headers,
    };
    return config;
};

export const onRequestError = (error: AxiosError): Promise<AxiosError> =>
    Promise.reject(error);
