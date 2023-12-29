import { jwtDecode } from 'jwt-decode';

export const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts: string[] = value?.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts?.pop()?.split(';')?.shift();
    }
    return null;
};

export const removeCookie = (name: string) => {
    const expiredDate = new Date(0).toUTCString();
    document.cookie = `${name}=; expires=${expiredDate}; path=/`;
};

export const setCookie = (name: string, value: string) => {
    const decodedToken = jwtDecode(value);
    const expiration = new Date(0);

    if (decodedToken.exp) {
        expiration.setUTCSeconds(decodedToken.exp);
    }
    const cookieValue =
        encodeURIComponent(value) +
        (decodedToken.exp ? `; expires=${expiration.toUTCString()}` : '');

    document.cookie = `${name}=${cookieValue}; path=/`;
};
