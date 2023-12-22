import { AxiosError, AxiosResponse } from 'axios';
import { IApiEmployee } from '../../../interfaces/ApiDataInterface';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { API } from '../../api';
import { toast } from 'react-toastify';
import { IState } from '..';

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
    payload: Error;
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
    error: Error
): IFETCH_EMPLOYEE_FAILURE => ({
    type: 'FETCH_EMPLOYEE_FAILURE',
    payload: error,
});

export const fetchEmployee = (
    employeeId: number
): ThunkAction<Promise<void>, IState, {}, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<{}, {}, AnyAction>,
        getState: () => IState
    ): Promise<void> => {
        dispatch(fetchEmployeeRequest());

        const employeesList = getState().employees.employeesList;

        const employeeInState = employeesList.find(
            (employee) => employee.id === employeeId
        );

        try {
            if (!employeeInState) {
                const response: AxiosResponse = await API.get(
                    `/employee/${employeeId}`
                );
                if (response.data.data) {
                    dispatch(fetchEmployeeSuccess(response.data.data));
                } else {
                    toast.error('Could not find the requested employee.');
                    throw new Error('Could not find the requested employee');
                }
            } else {
                dispatch(fetchEmployeeSuccess(employeeInState));
            }
        } catch (error) {
            console.log(error);
            dispatch(fetchEmployeeFailure(error as AxiosError));
            toast.error(
                'Could not fetch employee details. Please try reloading the page.'
            );
        }
    };
};
