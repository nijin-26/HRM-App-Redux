import { AxiosError, AxiosResponse } from 'axios';
// import { getCookie } from '../../../../utils/cookie';
// import { refreshAccessToken } from '../../services/auth';

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
    // if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
    //     const { config } = error;
    //     const currentRefreshToken = getCookie('refershToken');
    //     if(currentRefreshToken) {
    //         const newTokens = await refreshAccessToken(currentRefreshToken)
    //     }
    // }
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
