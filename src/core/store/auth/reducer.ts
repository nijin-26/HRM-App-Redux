import { ActionType } from './actions';

interface IAuth {
    isLoggedIn: boolean;
}

const initialState: IAuth = {
    isLoggedIn: false,
};

const AuthReducer = (state = initialState, action: ActionType): IAuth => {
    switch (action.type) {
        case 'LOGIN_USER_SUCCESS':
            return { ...state, isLoggedIn: true };
        case 'LOGOUT_USER':
            return { ...state, isLoggedIn: false };
        default:
            return state;
    }
};

export default AuthReducer;
