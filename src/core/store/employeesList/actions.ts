import {
    IApiEmployee,
    IApiEmployeeSubmission,
    IApiEmployeesData,
} from '../../../interfaces/ApiDataInterface';
import * as types from './types';
import { toast } from 'react-toastify';
import {
    getEmployeesList,
    deleteEmployee,
    addEmployee,
    editEmployee,
} from '../../api';
import { AppDispatch, AppThunk, RootState } from '..';
import { requestHelper } from '../requests/actions';
import { REQUESTS_ENUM } from '../requests/requestsEnum';
import { ISearchParams } from '../../../interfaces/common';
import { clearEmployeeData } from '../employee/actions';

//Action Creators
//EMPLOYEES LIST FETCH
const fetchEmployeesSuccess = (
    employeesData: IApiEmployeesData,
    offset: number,
    limit: number
): types.IFETCH_EMPLOYEES_SUCCESS => ({
    type: 'FETCH_EMPLOYEES_SUCCESS',
    payload: {
        response: employeesData,
        offset,
        limit,
    },
});

//Thunk Action creator
export const fetchEmployees = (searchParams: ISearchParams): AppThunk => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const employeesListSlice =
            getState().employees.employeesList[
                Math.floor(searchParams.offset / searchParams.limit)
            ];

        if (employeesListSlice) {
            return;
        }
        try {
            const { data } = await requestHelper(
                dispatch,
                REQUESTS_ENUM.getEmployeesList,
                () => getEmployeesList(searchParams)
            );
            dispatch(
                fetchEmployeesSuccess(
                    data.data,
                    searchParams.offset,
                    searchParams.limit
                )
            );
        } catch (error) {
            console.log(error);
            toast.error(
                'Could not fetch employee details. Please try reloading the page.'
            );
        }
    };
};

// const fetchNextEmployee = (searchParams: ISearchParams): AppThunk => {
//     return async (dispatch: AppDispatch, getState: () => RootState) => {
//         const { employeesList } = getState().employees;

//         const biggestOffset = employeesList.length - 1;
//         const targetOffset =
//             biggestOffset * searchParams.limit +
//             employeesList[biggestOffset]!.length;

//         searchParams.limit = 1;
//         searchParams.offset = targetOffset;

//         const { data } = await requestHelper(
//             dispatch,
//             REQUESTS_ENUM.getNextEmployee,
//             () => getEmployeesList(searchParams)
//         );
//         return data.data.employees[0];
//     };
// };
const fetchNextEmployee = (
    searchParams: ISearchParams,
    fetchOffset: number
): AppThunk => {
    return async (dispatch: AppDispatch) => {
        searchParams.offset = fetchOffset;
        searchParams.limit = 1;

        const { data } = await requestHelper(
            dispatch,
            REQUESTS_ENUM.getNextEmployee,
            () => getEmployeesList(searchParams)
        );
        console.log(data.data.employees[0]);
        return data.data.employees[0];
    };
};

//EMPLOYEE DELETE
const deleteEmployeeSuccess = (
    empIdToDelete: number,
    insertIndex: number,
    empToAppend?: IApiEmployee
): types.IDELETE_EMPLOYEE_SUCCESS => ({
    type: 'DELETE_EMPLOYEE_SUCCESS',
    payload: {
        empIdToDelete,
        empToAppend,
        insertIndex,
    },
});

//thunk action creator
export const deleteEmployeeAction = (
    empIdToDelete: number,
    searchParams: ISearchParams
): AppThunk => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { employeesList } = getState().employees;

        let i = 0;
        while (i < employeesList.length) {
            if (!employeesList[i]) {
                break;
            }
            i++;
        }
        const fetchOffset = i * searchParams.limit;

        try {
            const empToAppend = await dispatch(
                fetchNextEmployee(searchParams, fetchOffset)
            );

            await requestHelper(dispatch, REQUESTS_ENUM.deleteEmployee, () =>
                deleteEmployee(empIdToDelete)
            );

            dispatch(
                deleteEmployeeSuccess(
                    empIdToDelete,
                    fetchOffset - 1,
                    empToAppend
                )
            );
            toast.success('Employee deleted Successfully');
        } catch (error) {
            console.log(error);
            toast.error('Employee deletion failed');
        }
    };
};

// EMPLOYEE ADD
//thunk function
export const addEmployeeAction = (
    apiSubmissionData: IApiEmployeeSubmission
): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await requestHelper(
                dispatch,
                REQUESTS_ENUM.addEmployee,
                () => addEmployee(apiSubmissionData)
            );
            dispatch(employeeListClear());
            toast.success('Employee details added successfully.');
            return data.data.id;
        } catch (error) {
            console.log(error);
            toast.error('Could not add employee details. Please try again.');
        }
    };
};

// EMPLOYEE EDIT
//thunk function
export const editEmployeeAction = (
    employeeId: number,
    apiSubmissionData: IApiEmployeeSubmission
): AppThunk => {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await requestHelper(
                dispatch,
                REQUESTS_ENUM.editEmployee,
                () => editEmployee(employeeId, apiSubmissionData)
            );
            dispatch(employeeListClear());
            dispatch(clearEmployeeData());
            toast.success('Employee details edited successfully.');
            return data.data.id;
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
