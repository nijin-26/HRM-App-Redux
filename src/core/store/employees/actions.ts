import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { API } from '../../api/useApi';

import { IApiEmployeesData } from '../../../interfaces/ApiDataInterface';
import { AxiosError, AxiosResponse } from 'axios';
import { IQueryParams } from '../../../interfaces/common';

//Action Definition
export interface IFETCH_EMPLOYEES_REQUEST {
    type: 'FETCH_EMPLOYEES_REQUEST';
}

export interface IFETCH_EMPLOYEES_SUCCESS {
    type: 'FETCH_EMPLOYEES_SUCCESS';
    payload: IApiEmployeesData;
}

export interface IFETCH_EMPLOYEES_FAILURE {
    type: 'FETCH_EMPLOYEES_FAILURE';
    payload: AxiosError;
}

export interface IDELETE_EMPLOYEE_REQUEST {
    type: 'DELETE_EMPLOYEE_REQUEST';
}

export interface IDELETE_EMPLOYEE_SUCCESS {
    type: 'DELETE_EMPLOYEE_SUCCESS';
}

export interface IDELETE_EMPLOYEE_FAILURE {
    type: 'DELETE_EMPLOYEE_FAILURE';
    payload: AxiosError;
}

//Union Action Type
export type ActionType =
    | IFETCH_EMPLOYEES_REQUEST
    | IFETCH_EMPLOYEES_SUCCESS
    | IFETCH_EMPLOYEES_FAILURE;

//Action Creators

//EMPLOYEES LIST FETCH
export const fetchEmployeesRequest = (): IFETCH_EMPLOYEES_REQUEST => ({
    type: 'FETCH_EMPLOYEES_REQUEST',
});

export const fetchEmployeesSuccess = (
    employeesData: IApiEmployeesData
): IFETCH_EMPLOYEES_SUCCESS => ({
    type: 'FETCH_EMPLOYEES_SUCCESS',
    payload: employeesData,
});

export const fetchEmployeesFailure = (
    error: AxiosError
): IFETCH_EMPLOYEES_FAILURE => ({
    type: 'FETCH_EMPLOYEES_FAILURE',
    payload: error,
});

//Async Action creator
export const fetchEmployees = (
    searchparams: IQueryParams
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    const { offset, limit, sortBy, sortDir } = searchparams;

    return async (
        dispatch: ThunkDispatch<{}, {}, AnyAction>
    ): Promise<void> => {
        dispatch(fetchEmployeesRequest());

        try {
            const response: AxiosResponse = await API.get(
                `/employee?limit=${limit}&offset=${offset}&sortBy=${sortBy}&sortDir=${sortDir}`
            );

            dispatch(fetchEmployeesSuccess(response.data.data));
        } catch (error) {
            dispatch(fetchEmployeesFailure(error as AxiosError));
        }
    };
};

//EMPLOYEE DELETE
export const deleteEmployeeRequest = (): IDELETE_EMPLOYEE_REQUEST => ({
    type: 'DELETE_EMPLOYEE_REQUEST',
});

export const deleteEmployeeSuccess = (): IDELETE_EMPLOYEE_SUCCESS => ({
    type: 'DELETE_EMPLOYEE_SUCCESS',
});

export const deleteEmployeeFailure = (
    error: AxiosError
): IDELETE_EMPLOYEE_FAILURE => ({
    type: 'DELETE_EMPLOYEE_FAILURE',
    payload: error,
});
