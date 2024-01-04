import { API } from "..";
import {
    IAPISignInRequest,
    IAPISignInResponse,
} from "../../../interfaces/ApiDataInterface";

export const signIn = (payload: IAPISignInRequest) => {
    return API.post<IAPISignInResponse>("auth/sign-in", payload);
};

export const renewAccessToken = (currentRefreshToken: string) => {
    return API.post<IAPISignInResponse>("auth/renew-token", {
        currentRefreshToken,
    });
};
