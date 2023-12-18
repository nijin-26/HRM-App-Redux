import { AxiosError, AxiosResponse } from 'axios';
import { IApiDepartment } from '../../../../interfaces/ApiDataInterface';
import { API } from '../../../api/useApi';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { toast } from 'react-toastify';

// Actions definitions
interface IFETCH_DEPARTMENTS_REQUEST {
    type: 'FETCH_DEPARTMENTS_REQUEST';
}

interface IFETCH_DEPARTMENTS_SUCCESS {
    type: 'FETCH_DEPARTMENTS_SUCCESS';
    payload: IApiDepartment[];
}

interface IFETCH_DEPARTMENTS_FAILURE {
    type: 'FETCH_DEPARTMENTS_FAILURE';
    payload: AxiosError;
}

export type ActionType =
    | IFETCH_DEPARTMENTS_REQUEST
    | IFETCH_DEPARTMENTS_SUCCESS
    | IFETCH_DEPARTMENTS_FAILURE;

// Action Creators

// DEPARTMENTS FETCH
export const fetchDepartmentsRequest = (): IFETCH_DEPARTMENTS_REQUEST => ({
    type: 'FETCH_DEPARTMENTS_REQUEST',
});

export const fetchDepartmentsSuccess = (
    departmentsData: IApiDepartment[]
): IFETCH_DEPARTMENTS_SUCCESS => ({
    type: 'FETCH_DEPARTMENTS_SUCCESS',
    payload: departmentsData,
});

export const fetchDepartmentsFailure = (
    error: AxiosError
): IFETCH_DEPARTMENTS_FAILURE => ({
    type: 'FETCH_DEPARTMENTS_FAILURE',
    payload: error,
});

// Thunk Action
export const fetchDepartments = (): ThunkAction<
    Promise<void>,
    {},
    {},
    AnyAction
> => {
    return async (
        dispatch: ThunkDispatch<{}, {}, AnyAction>
    ): Promise<void> => {
        dispatch(fetchDepartmentsRequest());
        try {
            const response: AxiosResponse = await API.get('/departments');
            dispatch(fetchDepartmentsSuccess(response.data));
        } catch (error) {
            console.log(error);
            dispatch(fetchDepartmentsFailure(error as AxiosError));
            toast.error(
                'Could not fetch departments list. Please try reloading the page.'
            );
        }
    };
};
