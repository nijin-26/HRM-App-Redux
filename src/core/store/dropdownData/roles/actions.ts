import { AxiosError } from 'axios';
import { IApiRole } from '../../../../interfaces/ApiDataInterface';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { toast } from 'react-toastify';
import { getRoles } from '../../../api';

// Actions definitions
interface IFETCH_ROLES_REQUEST {
    type: 'FETCH_ROLES_REQUEST';
}

interface IFETCH_ROLES_SUCCESS {
    type: 'FETCH_ROLES_SUCCESS';
    payload: IApiRole[];
}

interface IFETCH_ROLES_FAILURE {
    type: 'FETCH_ROLES_FAILURE';
    payload: AxiosError;
}

export type ActionType =
    | IFETCH_ROLES_REQUEST
    | IFETCH_ROLES_SUCCESS
    | IFETCH_ROLES_FAILURE;

// Action Creators

// ROLES FETCH
export const fetchRolesRequest = (): IFETCH_ROLES_REQUEST => ({
    type: 'FETCH_ROLES_REQUEST',
});

export const fetchRolesSuccess = (
    rolesData: IApiRole[]
): IFETCH_ROLES_SUCCESS => ({
    type: 'FETCH_ROLES_SUCCESS',
    payload: rolesData,
});

export const fetchRolesFailure = (error: AxiosError): IFETCH_ROLES_FAILURE => ({
    type: 'FETCH_ROLES_FAILURE',
    payload: error,
});

// Thunk Action
export const fetchRoles = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<{}, {}, AnyAction>
    ): Promise<void> => {
        dispatch(fetchRolesRequest());
        try {
            const { data } = await getRoles();
            dispatch(fetchRolesSuccess(data));
        } catch (error) {
            console.log(error);
            dispatch(fetchRolesFailure(error as AxiosError));
            toast.error(
                'Could not fetch roles list. Please try reloading the page.'
            );
        }
    };
};
