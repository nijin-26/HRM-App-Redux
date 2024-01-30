import { AxiosError, AxiosResponse } from "axios";
import {
    refreshTokens,
    removeCookie,
    setCookie,
} from "../../../../utils/cookie";
import { API } from ".";
import { toast } from "react-toastify";

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
    if (
        error.response?.status === HTTP_STATUS.UNAUTHORIZED &&
        error.config!.url !== "auth/renew-token"
    ) {
        const response = await refreshTokens();

        if (response) {
            setCookie("accessToken", response.access_token);
            setCookie("refreshToken", response.refresh_token);
            return API(error.config!);
        } else {
            removeCookie("accessToken");
            removeCookie("refreshToken");
            toast.error("Session Expired.");
            location.reload();
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
