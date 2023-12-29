//Action Types
interface ILOGIN_USER {
    type: 'LOGIN_USER';
}

interface ILOGIN_USER_SUCCESS {
    type: 'LOGIN_USER_SUCCESS';
}

interface ILOGOUT_USER {
    type: 'LOGOUT_USER';
}

export type ActionType = ILOGIN_USER | ILOGIN_USER_SUCCESS | ILOGOUT_USER;

//Action Creators
export const loginUser = (): ILOGIN_USER_SUCCESS => ({
    type: 'LOGIN_USER_SUCCESS',
});
export const logoutUser = (): ILOGOUT_USER => ({ type: 'LOGOUT_USER' });
