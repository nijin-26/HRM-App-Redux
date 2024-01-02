import axios, { AxiosError, AxiosResponse } from 'axios';
import { refreshTokens } from '../../../../utils/cookie';

enum HTTP_STATUS {
    SUCCESS = 200,
    INFORMATION = 300,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    FORBIDDEN = 403,
    SERVER_ERROR = 500,
    UNAUTHORIZED = 401,
}

export async function onResponseError(error: AxiosError): Promise<AxiosError> {
    if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
        try {
            await refreshTokens();
            axios.request(error.config!);
        } catch (error) {
            Promise.reject(error);
        }
    }
    return Promise.reject(error.response);
}

export function onResponse(response: AxiosResponse) {
    if (
        response.status >= HTTP_STATUS.SUCCESS &&
        response.status <= HTTP_STATUS.INFORMATION
    ) {
        return Promise.resolve(response);
    }
}
