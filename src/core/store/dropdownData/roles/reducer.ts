import { AxiosError } from 'axios';
import { ActionType } from './actions';
import { IReactSelectOption } from '../../../../interfaces/common';
import { modifySelectOptionsArray } from '../../../../utils';

interface IRolesState {
    rolesData: IReactSelectOption[];
    rolesFetchLoading: boolean;
    rolesFetchError: AxiosError | null;
}

const initialState: IRolesState = {
    rolesData: [],
    rolesFetchLoading: false,
    rolesFetchError: null,
};

const rolesReducer = (
    state = initialState,
    action: ActionType
): IRolesState => {
    switch (action.type) {
        case 'FETCH_ROLES_REQUEST':
            return {
                ...state,
                rolesFetchLoading: true,
            };
        case 'FETCH_ROLES_SUCCESS':
            return {
                ...state,
                rolesFetchLoading: false,
                rolesFetchError: null,
                rolesData: modifySelectOptionsArray(action.payload, 'role'),
            };
        case 'FETCH_ROLES_FAILURE':
            return {
                ...state,
                rolesFetchLoading: false,
                rolesFetchError: action.payload,
            };
        default:
            return state;
    }
};

export default rolesReducer;
