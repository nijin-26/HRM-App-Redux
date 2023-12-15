import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { API } from '../../api/useApi';

import { IApiEmployeesData } from '../../../interfaces/ApiDataInterface';
import { AxiosError, AxiosResponse } from 'axios';
import { IQueryParams, IReactSelectOption } from '../../../interfaces/common';

import { toast } from 'react-toastify';
import { MultiValue } from 'react-select';

//Action Definitions
interface IFETCH_EMPLOYEES_REQUEST {
    type: 'FETCH_EMPLOYEES_REQUEST';
}

interface IFETCH_EMPLOYEES_SUCCESS {
    type: 'FETCH_EMPLOYEES_SUCCESS';
    payload: IApiEmployeesData;
}

interface IFETCH_EMPLOYEES_FAILURE {
    type: 'FETCH_EMPLOYEES_FAILURE';
    payload: AxiosError;
}

interface IDELETE_EMPLOYEE_REQUEST {
    type: 'DELETE_EMPLOYEE_REQUEST';
}

interface IDELETE_EMPLOYEE_SUCCESS {
    type: 'DELETE_EMPLOYEE_SUCCESS';
    payload: number;
}

interface IDELETE_EMPLOYEE_FAILURE {
    type: 'DELETE_EMPLOYEE_FAILURE';
    payload: AxiosError;
}

interface IEMPLOYEE_NAME_FILTER_CHANGE {
    type: 'EMPLOYEE_NAME_FILTER_CHANGE';
    payload: string;
}

interface IEMPLOYEE_SKILLS_FILTER_CHANGE {
    type: 'EMPLOYEE_SKILLS_FILTER_CHANGE';
    payload: MultiValue<IReactSelectOption>;
}

interface IEMPLOYEE_LIST_FILTER_CLEAR {
    type: 'EMPLOYEE_LIST_FILTER_CLEAR';
}

//Union Action Type
export type ActionType =
    | IFETCH_EMPLOYEES_REQUEST
    | IFETCH_EMPLOYEES_SUCCESS
    | IFETCH_EMPLOYEES_FAILURE
    | IDELETE_EMPLOYEE_REQUEST
    | IDELETE_EMPLOYEE_SUCCESS
    | IDELETE_EMPLOYEE_FAILURE
    | IEMPLOYEE_NAME_FILTER_CHANGE
    | IEMPLOYEE_SKILLS_FILTER_CHANGE
    | IEMPLOYEE_LIST_FILTER_CLEAR;

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

//Thunk Action creator
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
            toast.error(
                'Could not fetch employee details. Please try reloading the page.'
            );
        }
    };
};

//EMPLOYEE DELETE
export const deleteEmployeeRequest = (): IDELETE_EMPLOYEE_REQUEST => ({
    type: 'DELETE_EMPLOYEE_REQUEST',
});

export const deleteEmployeeSuccess = (
    deletedEmpId: number
): IDELETE_EMPLOYEE_SUCCESS => ({
    type: 'DELETE_EMPLOYEE_SUCCESS',
    payload: deletedEmpId,
});

export const deleteEmployeeFailure = (
    error: AxiosError
): IDELETE_EMPLOYEE_FAILURE => ({
    type: 'DELETE_EMPLOYEE_FAILURE',
    payload: error,
});

//thunk action creator
export const deleteEmployeeAction = (
    empIdToDelete: number
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<{}, {}, AnyAction>
    ): Promise<void> => {
        dispatch(deleteEmployeeRequest());
        try {
            await API({
                method: 'DELETE',
                url: `/employee/${empIdToDelete}`,
            });
            dispatch(deleteEmployeeSuccess(empIdToDelete));
            toast.success('Employee deleted Successfully');
        } catch (error) {
            dispatch(deleteEmployeeFailure(error as AxiosError));
            toast.error('Employee deletion failed');
        }
    };
};

//EMPLOYEE_FILTER_CHANGE
export const employeeNameFilterChange = (
    employeeNameFilterValue: string
): IEMPLOYEE_NAME_FILTER_CHANGE => ({
    type: 'EMPLOYEE_NAME_FILTER_CHANGE',
    payload: employeeNameFilterValue,
});

export const employeeSkillsFilterChange = (
    selectedSkills: MultiValue<IReactSelectOption>
): IEMPLOYEE_SKILLS_FILTER_CHANGE => ({
    type: 'EMPLOYEE_SKILLS_FILTER_CHANGE',
    payload: selectedSkills,
});

export const employeeListFilterClear = (): IEMPLOYEE_LIST_FILTER_CLEAR => ({
    type: 'EMPLOYEE_LIST_FILTER_CLEAR',
});
