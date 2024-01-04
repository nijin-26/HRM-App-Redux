import { AxiosError, AxiosRequestConfig } from "axios";
import { getCookie } from "../../../../utils/cookie";

export const onRequest = (config: AxiosRequestConfig) => {
    const token = getCookie("accessToken");
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
