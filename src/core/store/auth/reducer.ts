import { getCookie } from "../../../utils/cookie";
import { ActionType } from "./actions";

interface IAuth {
    isLoggedIn: boolean;
    userName: string;
}

const initialState: IAuth = {
    userName: "",
    isLoggedIn: getCookie("accessToken") ? true : false,
};

const AuthReducer = (state = initialState, action: ActionType): IAuth => {
    switch (action.type) {
        case "LOGIN_USER":
            return { ...state, userName: action.payload, isLoggedIn: true };
        case "LOGOUT_USER":
            return { ...state, userName: "", isLoggedIn: false };
        default:
            return state;
    }
};

export default AuthReducer;
