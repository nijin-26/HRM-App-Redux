import { getCookie } from "../../../utils/cookie";
import { ActionType } from "./actions";

export interface IAuth {
    isLoggedIn?: boolean;
    userID?: number;
    userEmail?: string;
    userName: string;
    imageURL?: string;
    isAdmin?: boolean;
}

const initialState: IAuth = {
    userID: undefined,
    userName: "",
    imageURL: "",
    isAdmin: false,
    isLoggedIn:
        getCookie("accessToken") || getCookie("refreshToken") ? true : false,
};

const AuthReducer = (state = initialState, action: ActionType): IAuth => {
    switch (action.type) {
        case "LOGIN_USER":
            return { ...state, ...action.payload, isLoggedIn: true };
        case "LOGOUT_USER":
            return {
                ...state,
                userName: "",
                userID: undefined,
                userEmail: "",
                imageURL: "",
                isAdmin: false,
                isLoggedIn: false,
            };
        default:
            return state;
    }
};

export default AuthReducer;
