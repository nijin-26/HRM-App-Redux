import { AxiosError, AxiosRequestConfig } from "axios";
// import { getAccessToken } from '../../pages/Auth/helper';

export const onRequest = (config: AxiosRequestConfig) => {
    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoiYWJoaWIiLCJpYXQiOjE3MDQ4NTk4MTAsImV4cCI6MTcwNDg2MzQxMH0.tV5jBMvvsQ7bkPKaMNNFkil3b4H2UR_kE4pf1RK_vB0";
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
