import { AxiosError, AxiosRequestConfig } from 'axios';
// import { getAccessToken } from '../../pages/Auth/helper';

export const onRequest = (config: AxiosRequestConfig) => {
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoiYWJoaWIiLCJpYXQiOjE3MDMyNDQ1NTcsImV4cCI6MTcwMzI0ODE1N30.KlwG9Z8vJ5PT-RJBU2SfrEz3rf4PqxYdfZeFgEjygoc';
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
