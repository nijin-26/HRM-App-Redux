import { API } from "..";
import {
    IAPISignInRequest,
    IAPISignInResponse,
    IAPISignUpRequest,
    IAPISignUpResponse,
} from "../../../interfaces/ApiDataInterface";

export const signIn = (payload: IAPISignInRequest) => {
    return API.post<IAPISignInResponse>("auth/sign-in", payload);
};

export const signUp = (payload: IAPISignUpRequest) => {
    return API.post<IAPISignUpResponse>("auth/sign-up", payload);
};

export const renewAccessToken = (currentRefreshToken: string) => {
    return API.post<IAPISignInResponse>("auth/renew-token", {
        refreshToken: currentRefreshToken,
    });
};
