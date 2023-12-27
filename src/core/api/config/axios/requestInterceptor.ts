import { AxiosError, AxiosRequestConfig } from 'axios';
// import { getAccessToken } from '../../pages/Auth/helper';

export const onRequest = (config: AxiosRequestConfig) => {
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoiYWJoaWIiLCJpYXQiOjE3MDM2ODA1NzcsImV4cCI6MTcwMzY4NDE3N30.tF3Uib-WjejJFStEbNEDrAnuLgl_0iC9EVZU7_STUZg';
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
