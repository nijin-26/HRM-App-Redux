import {
    IApiEmployee,
    IApiEmployeeSubmission,
    IApiEmployeesData,
} from '../../../interfaces/ApiDataInterface';
import { AxiosError } from 'axios';
import { IQueryParams, IReactSelectOption } from '../../../interfaces/common';

import { toast } from 'react-toastify';
import { MultiValue } from 'react-select';

import {
    getEmployeesList,
    deleteEmployee,
    addEmployee,
    editEmployee,
} from '../../api';
import { AppDispatch, AppThunk } from '..';

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

interface IADD_EMPLOYEE_REQUEST {
    type: 'ADD_EMPLOYEE_REQUEST';
}

interface IADD_EMPLOYEE_SUCCESS {
    type: 'ADD_EMPLOYEE_SUCCESS';
    payload: {
        apiSubmissionData: IApiEmployeeSubmission;
        storeData: IApiEmployee;
    };
}

interface IADD_EMPLOYEE_FAILURE {
    type: 'ADD_EMPLOYEE_FAILURE';
    payload: AxiosError;
}

interface IEDIT_EMPLOYEE_REQUEST {
    type: 'EDIT_EMPLOYEE_REQUEST';
}

interface IEDIT_EMPLOYEE_SUCCESS {
    type: 'EDIT_EMPLOYEE_SUCCESS';
    payload: {
        apiSubmissionData: IApiEmployeeSubmission;
        storeData: IApiEmployee;
    };
}

interface IEDIT_EMPLOYEE_FAILURE {
    type: 'EDIT_EMPLOYEE_FAILURE';
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
    | IADD_EMPLOYEE_REQUEST
    | IADD_EMPLOYEE_SUCCESS
    | IADD_EMPLOYEE_FAILURE
    | IEDIT_EMPLOYEE_REQUEST
    | IEDIT_EMPLOYEE_SUCCESS
    | IEDIT_EMPLOYEE_FAILURE
    | IEMPLOYEE_NAME_FILTER_CHANGE
    | IEMPLOYEE_SKILLS_FILTER_CHANGE
    | IEMPLOYEE_LIST_FILTER_CLEAR;

//Action Creators

//EMPLOYEES LIST FETCH
const fetchEmployeesRequest = (): IFETCH_EMPLOYEES_REQUEST => ({
    type: 'FETCH_EMPLOYEES_REQUEST',
});

const fetchEmployeesSuccess = (
    employeesData: IApiEmployeesData
): IFETCH_EMPLOYEES_SUCCESS => ({
    type: 'FETCH_EMPLOYEES_SUCCESS',
    payload: employeesData,
});

const fetchEmployeesFailure = (
    error: AxiosError
): IFETCH_EMPLOYEES_FAILURE => ({
    type: 'FETCH_EMPLOYEES_FAILURE',
    payload: error,
});

//Thunk Action creator
export const fetchEmployees = (searchparams: IQueryParams): AppThunk => {
    const { offset, limit, sortBy, sortDir } = searchparams;

    return async (dispatch: AppDispatch) => {
        dispatch(fetchEmployeesRequest());
        try {
            const { data } = await getEmployeesList(
                limit,
                offset,
                sortBy,
                sortDir
            );
            dispatch(fetchEmployeesSuccess(data.data));
        } catch (error) {
            dispatch(fetchEmployeesFailure(error as AxiosError));
            toast.error(
                'Could not fetch employee details. Please try reloading the page.'
            );
        }
    };
};

//EMPLOYEE DELETE
const deleteEmployeeRequest = (): IDELETE_EMPLOYEE_REQUEST => ({
    type: 'DELETE_EMPLOYEE_REQUEST',
});

const deleteEmployeeSuccess = (
    deletedEmpId: number
): IDELETE_EMPLOYEE_SUCCESS => ({
    type: 'DELETE_EMPLOYEE_SUCCESS',
    payload: deletedEmpId,
});

const deleteEmployeeFailure = (
    error: AxiosError
): IDELETE_EMPLOYEE_FAILURE => ({
    type: 'DELETE_EMPLOYEE_FAILURE',
    payload: error,
});

//thunk action creator
export const deleteEmployeeAction = (empIdToDelete: number): AppThunk => {
    return async (dispatch: AppDispatch) => {
        dispatch(deleteEmployeeRequest());
        try {
            await deleteEmployee(empIdToDelete);
            dispatch(deleteEmployeeSuccess(empIdToDelete));
            toast.success('Employee deleted Successfully');
        } catch (error) {
            dispatch(deleteEmployeeFailure(error as AxiosError));
            toast.error('Employee deletion failed');
        }
    };
};

const addEmployeeRequest = (): IADD_EMPLOYEE_REQUEST => ({
    type: 'ADD_EMPLOYEE_REQUEST',
});

const addEmployeeSuccess = (
    apiSubmissionData: IApiEmployeeSubmission,
    storeData: IApiEmployee
): IADD_EMPLOYEE_SUCCESS => ({
    type: 'ADD_EMPLOYEE_SUCCESS',
    payload: { apiSubmissionData, storeData },
});

const addEmployeeError = (error: AxiosError): IADD_EMPLOYEE_FAILURE => ({
    type: 'ADD_EMPLOYEE_FAILURE',
    payload: error,
});

//thunk function
export const addEmployeeAction = (
    apiSubmissionData: IApiEmployeeSubmission,
    storeData: IApiEmployee
): AppThunk => {
    return async (dispatch: AppDispatch) => {
        dispatch(addEmployeeRequest());
        try {
            const { data } = await addEmployee(apiSubmissionData);
            storeData.id = data.data.id;
            dispatch(addEmployeeSuccess(apiSubmissionData, storeData));
            toast.success('Employee details added successfully.');
        } catch (error) {
            console.log(error);
            dispatch(addEmployeeError(error as AxiosError));
            toast.error('Could not add employee details. Please try again.');
        }
    };
};

const editEmployeeRequest = (): IEDIT_EMPLOYEE_REQUEST => ({
    type: 'EDIT_EMPLOYEE_REQUEST',
});

const editEmployeeSuccess = (
    apiSubmissionData: IApiEmployeeSubmission,
    storeData: IApiEmployee
): IEDIT_EMPLOYEE_SUCCESS => ({
    type: 'EDIT_EMPLOYEE_SUCCESS',
    payload: { apiSubmissionData, storeData },
});

const editEmployeeError = (error: AxiosError): IEDIT_EMPLOYEE_FAILURE => ({
    type: 'EDIT_EMPLOYEE_FAILURE',
    payload: error,
});

//thunk function
export const editEmployeeAction = (
    employeeId: number,
    apiSubmissionData: IApiEmployeeSubmission,
    storeData: IApiEmployee
): AppThunk => {
    return async (dispatch: AppDispatch) => {
        dispatch(editEmployeeRequest());
        try {
            await editEmployee(employeeId, apiSubmissionData);
            dispatch(editEmployeeSuccess(apiSubmissionData, storeData));
            toast.success('Employee details edited successfully.');
        } catch (error) {
            console.log(error);
            dispatch(editEmployeeError(error as AxiosError));
            toast.error('Could not edit employee details. Please try again.');
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
