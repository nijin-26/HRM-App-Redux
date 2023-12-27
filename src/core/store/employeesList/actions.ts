import {
    IApiEmployee,
    IApiEmployeeSubmission,
    IApiEmployeesData,
} from '../../../interfaces/ApiDataInterface';
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
import { requestHelper } from '../requests/actions';
import { REQUESTS_ENUM } from '../requests/requestsEnum';

//Action Definitions
interface IFETCH_EMPLOYEES_SUCCESS {
    type: 'FETCH_EMPLOYEES_SUCCESS';
    payload: IApiEmployeesData;
}

interface IDELETE_EMPLOYEE_SUCCESS {
    type: 'DELETE_EMPLOYEE_SUCCESS';
    payload: number;
}

interface IADD_EMPLOYEE_SUCCESS {
    type: 'ADD_EMPLOYEE_SUCCESS';
    payload: {
        apiSubmissionData: IApiEmployeeSubmission;
        storeData: IApiEmployee;
    };
}

interface IEDIT_EMPLOYEE_SUCCESS {
    type: 'EDIT_EMPLOYEE_SUCCESS';
    payload: {
        apiSubmissionData: IApiEmployeeSubmission;
        storeData: IApiEmployee;
    };
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

interface IEMPLOYEE_LIST_CLEAR {
    type: 'EMPLOYEE_LIST_CLEAR';
}

//Union Action Type
export type ActionType =
    | IFETCH_EMPLOYEES_SUCCESS
    | IDELETE_EMPLOYEE_SUCCESS
    | IADD_EMPLOYEE_SUCCESS
    | IEDIT_EMPLOYEE_SUCCESS
    | IEMPLOYEE_LIST_CLEAR
    | IEMPLOYEE_NAME_FILTER_CHANGE
    | IEMPLOYEE_SKILLS_FILTER_CHANGE
    | IEMPLOYEE_LIST_FILTER_CLEAR;

//Action Creators

//EMPLOYEES LIST FETCH
const fetchEmployeesSuccess = (
    employeesData: IApiEmployeesData
): IFETCH_EMPLOYEES_SUCCESS => ({
    type: 'FETCH_EMPLOYEES_SUCCESS',
    payload: employeesData,
});

//Thunk Action creator
export const fetchEmployees = (searchparams: IQueryParams): AppThunk => {
    const { offset, limit, sortBy, sortDir, skillIds } = searchparams;

    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await requestHelper(
                dispatch,
                REQUESTS_ENUM.getEmployeesList,
                () => getEmployeesList(limit, offset, sortBy, sortDir, skillIds)
            );
            dispatch(fetchEmployeesSuccess(data.data));
        } catch (error) {
            toast.error(
                'Could not fetch employee details. Please try reloading the page.'
            );
        }
    };
};

//EMPLOYEE DELETE
const deleteEmployeeSuccess = (
    deletedEmpId: number
): IDELETE_EMPLOYEE_SUCCESS => ({
    type: 'DELETE_EMPLOYEE_SUCCESS',
    payload: deletedEmpId,
});

//thunk action creator
export const deleteEmployeeAction = (empIdToDelete: number): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            await requestHelper(dispatch, REQUESTS_ENUM.deleteEmployee, () =>
                deleteEmployee(empIdToDelete)
            );
            dispatch(deleteEmployeeSuccess(empIdToDelete));
            toast.success('Employee deleted Successfully');
        } catch (error) {
            toast.error('Employee deletion failed');
        }
    };
};

//EMPLOYEE ADD
const addEmployeeSuccess = (
    apiSubmissionData: IApiEmployeeSubmission,
    storeData: IApiEmployee
): IADD_EMPLOYEE_SUCCESS => ({
    type: 'ADD_EMPLOYEE_SUCCESS',
    payload: { apiSubmissionData, storeData },
});

//thunk function
export const addEmployeeAction = (
    apiSubmissionData: IApiEmployeeSubmission,
    storeData: IApiEmployee
): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await requestHelper(
                dispatch,
                REQUESTS_ENUM.addEmployee,
                () => addEmployee(apiSubmissionData)
            );
            storeData.id = data.data.id;
            dispatch(addEmployeeSuccess(apiSubmissionData, storeData));
            toast.success('Employee details added successfully.');
        } catch (error) {
            console.log(error);
            toast.error('Could not add employee details. Please try again.');
        }
    };
};

// EMPLOYEE EDIT
const editEmployeeSuccess = (
    apiSubmissionData: IApiEmployeeSubmission,
    storeData: IApiEmployee
): IEDIT_EMPLOYEE_SUCCESS => ({
    type: 'EDIT_EMPLOYEE_SUCCESS',
    payload: { apiSubmissionData, storeData },
});

//thunk function
export const editEmployeeAction = (
    employeeId: number,
    apiSubmissionData: IApiEmployeeSubmission,
    storeData: IApiEmployee
): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            await requestHelper(dispatch, REQUESTS_ENUM.editEmployee, () =>
                editEmployee(employeeId, apiSubmissionData)
            );
            dispatch(editEmployeeSuccess(apiSubmissionData, storeData));
            toast.success('Employee details edited successfully.');
        } catch (error) {
            console.log(error);
            toast.error('Could not edit employee details. Please try again.');
        }
    };
};

//EMPLOYEE LIST CLEAR
export const employeeListClear = (): IEMPLOYEE_LIST_CLEAR => ({
    type: 'EMPLOYEE_LIST_CLEAR',
});

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
