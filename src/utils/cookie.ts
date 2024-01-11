import { jwtDecode } from "jwt-decode";
import { renewAccessToken } from "../core/api/services/auth";
import { toast } from "react-toastify";

type cookieName = "accessToken" | "refreshToken";

export const getCookie = (name: cookieName) => {
    const value = `; ${document.cookie}`;
    const parts: string[] = value?.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts?.pop()?.split(";")?.shift();
    }
    return null;
};

export const removeCookie = (name: cookieName) => {
    const expiredDate = new Date(0).toUTCString();
    document.cookie = `${name}=; expires=${expiredDate}; path=/`;
};

export const setCookie = (name: cookieName, value: string) => {
    const decodedToken = jwtDecode(value);
    const expiration = new Date(0);

    if (decodedToken.exp) {
        expiration.setUTCSeconds(decodedToken.exp);
    }
    const cookieValue =
        encodeURIComponent(value) +
        (decodedToken.exp ? `; expires=${expiration.toUTCString()}` : "");

    document.cookie = `${name}=${cookieValue}; path=/`;
};

export const refreshTokens = async () => {
    const currentRefreshToken = getCookie("refreshToken");
    if (currentRefreshToken) {
        try {
            const { data: newTokens } =
                await renewAccessToken(currentRefreshToken);
            return newTokens;
        } catch (error) {
            toast.error(
                "Unable to refresh your session. Please log in again to continue."
            );
            return;
        }
    } else {
        toast.error(
            "Unable to refresh your session. Please log in again to continue."
        );
        return;
    }
};
