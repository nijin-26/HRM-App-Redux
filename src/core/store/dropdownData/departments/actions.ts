import { AxiosError } from 'axios';
import { IApiDepartment } from '../../../../interfaces/ApiDataInterface';
import { AppDispatch, AppThunk } from '../..';
import { toast } from 'react-toastify';
import { getDepartments } from '../../../api';

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
export const fetchDepartments = (): AppThunk => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(fetchDepartmentsRequest());
        try {
            const { data } = await getDepartments();
            dispatch(fetchDepartmentsSuccess(data));
        } catch (error) {
            console.log(error);
            dispatch(fetchDepartmentsFailure(error as AxiosError));
            toast.error(
                'Could not fetch departments list. Please try reloading the page.'
            );
        }
    };
};
