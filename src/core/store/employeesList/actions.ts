import {
    IApiEmployee,
    IApiEmployeeSubmission,
    IApiEmployeesData,
} from '../../../interfaces/ApiDataInterface';
import * as types from './types';
import { ISearchParams } from '../../../interfaces/common';
import { toast } from 'react-toastify';
import {
    getEmployeesList,
    deleteEmployee,
    addEmployee,
    editEmployee,
} from '../../api';
import { AppDispatch, AppThunk } from '..';
import { requestHelper } from '../requests/actions';
import { REQUESTS_ENUM } from '../requests/requestsEnum';

//Action Creators
//EMPLOYEES LIST FETCH
const fetchEmployeesSuccess = (
    employeesData: IApiEmployeesData
): types.IFETCH_EMPLOYEES_SUCCESS => ({
    type: 'FETCH_EMPLOYEES_SUCCESS',
    payload: employeesData,
});

//Thunk Action creator
export const fetchEmployees = (searchParams: ISearchParams): AppThunk => {
    const { offset, limit, sortBy, sortDir, skillIds, search } = searchParams;

    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await requestHelper(
                dispatch,
                REQUESTS_ENUM.getEmployeesList,
                () =>
                    getEmployeesList(
                        offset,
                        limit,
                        sortBy,
                        sortDir,
                        skillIds,
                        search
                    )
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
): types.IDELETE_EMPLOYEE_SUCCESS => ({
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
): types.IADD_EMPLOYEE_SUCCESS => ({
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
): types.IEDIT_EMPLOYEE_SUCCESS => ({
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
export const employeeListClear = (): types.IEMPLOYEE_LIST_CLEAR => ({
    type: 'EMPLOYEE_LIST_CLEAR',
});
