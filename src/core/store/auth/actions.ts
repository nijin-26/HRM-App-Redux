//Action Types
interface ILOGIN_USER {
    type: 'LOGIN_USER';
}

interface ILOGOUT_USER {
    type: 'LOGOUT_USER';
}

export type ActionType = ILOGIN_USER | ILOGOUT_USER;

//Action Creators
export const loginUser = (): ILOGIN_USER => ({
    type: 'LOGIN_USER',
});
export const logoutUser = (): ILOGOUT_USER => ({ type: 'LOGOUT_USER' });
