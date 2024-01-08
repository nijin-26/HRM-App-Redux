//Action Types
interface ILOGIN_USER {
    type: "LOGIN_USER";
    payload: string;
}

interface ILOGOUT_USER {
    type: "LOGOUT_USER";
}

export type ActionType = ILOGIN_USER | ILOGOUT_USER;

//Action Creators
export const loginUser = (userName: string): ILOGIN_USER => ({
    type: "LOGIN_USER",
    payload: userName,
});
export const logoutUser = (): ILOGOUT_USER => ({ type: "LOGOUT_USER" });
