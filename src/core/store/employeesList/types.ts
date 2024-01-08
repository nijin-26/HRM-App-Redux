import { IApiEmployeesData } from '../../../interfaces/ApiDataInterface';

//Action Definitions
export interface IFETCH_EMPLOYEES_SUCCESS {
    type: 'FETCH_EMPLOYEES_SUCCESS';
    payload: {
        response: IApiEmployeesData;
        offset: number;
        limit: number;
    };
}

export interface IDELETE_EMPLOYEE_SUCCESS {
    type: 'DELETE_EMPLOYEE_SUCCESS';
    payload: number;
}

export interface IEMPLOYEE_LIST_CLEAR {
    type: 'EMPLOYEE_LIST_CLEAR';
}

//Union Action Type
export type ActionType =
    | IFETCH_EMPLOYEES_SUCCESS
    | IDELETE_EMPLOYEE_SUCCESS
    | IEMPLOYEE_LIST_CLEAR;
