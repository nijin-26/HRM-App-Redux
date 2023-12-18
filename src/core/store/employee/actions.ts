import { AxiosError, AxiosResponse } from 'axios';
import { IApiEmployee } from '../../../interfaces/ApiDataInterface';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { API } from '../../api/useApi';
import { toast } from 'react-toastify';

//Action Types
interface IFETCH_EMPLOYEE_REQUEST {
    type: 'FETCH_EMPLOYEE_REQUEST';
}

interface IFETCH_EMPLOYEE_SUCCESS {
    type: 'FETCH_EMPLOYEE_SUCCESS';
    payload: IApiEmployee;
}

interface IFETCH_EMPLOYEE_FAILURE {
    type: 'FETCH_EMPLOYEE_FAILURE';
    payload: AxiosError;
}

export type ActionType =
    | IFETCH_EMPLOYEE_REQUEST
    | IFETCH_EMPLOYEE_SUCCESS
    | IFETCH_EMPLOYEE_FAILURE;

//Action Creators
export const fetchEmployeeRequest = (): IFETCH_EMPLOYEE_REQUEST => ({
    type: 'FETCH_EMPLOYEE_REQUEST',
});

export const fetchEmployeeSuccess = (
    employeeData: IApiEmployee
): IFETCH_EMPLOYEE_SUCCESS => ({
    type: 'FETCH_EMPLOYEE_SUCCESS',
    payload: employeeData,
});

export const fetchEmployeeFailure = (
    error: AxiosError
): IFETCH_EMPLOYEE_FAILURE => ({
    type: 'FETCH_EMPLOYEE_FAILURE',
    payload: error,
});

export const fetchEmployee = (
    employeeId: number
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<{}, {}, AnyAction>
    ): Promise<void> => {
        dispatch(fetchEmployeeRequest());
        try {
            const response: AxiosResponse = await API.get(
                `/employee/${employeeId}`
            );
            dispatch(fetchEmployeeSuccess(response.data));
        } catch (error) {
            dispatch(fetchEmployeeFailure(error as AxiosError));
            toast.error(
                'Could not fetch employee details. Please try reloading the page.'
            );
        }
    };
};
