// import { AppDispatch, AppThunk } from "..";
// import { getEmployee } from "../../api";
// import { requestHelper } from "../requests/actions";
// import { REQUESTS_ENUM } from "../requests/requestsEnum";

import { IAuth } from "./reducer";

//Action Types
interface ILOGIN_USER {
    type: "LOGIN_USER";
    payload: IAuth;
}

interface ILOGOUT_USER {
    type: "LOGOUT_USER";
}

export type ActionType = ILOGIN_USER | ILOGOUT_USER;

//Action Creators
export const loginUser = (userDetails: IAuth): ILOGIN_USER => ({
    type: "LOGIN_USER",
    payload: userDetails,
});

export const logoutUser = (): ILOGOUT_USER => ({ type: "LOGOUT_USER" });
