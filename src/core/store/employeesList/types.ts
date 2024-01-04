import {
    IApiEmployee,
    IApiEmployeeSubmission,
    IApiEmployeesData,
} from "../../../interfaces/ApiDataInterface";

//Action Definitions
export interface IFETCH_EMPLOYEES_SUCCESS {
    type: "FETCH_EMPLOYEES_SUCCESS";
    payload: IApiEmployeesData;
}

export interface IDELETE_EMPLOYEE_SUCCESS {
    type: "DELETE_EMPLOYEE_SUCCESS";
    payload: number;
}

export interface IADD_EMPLOYEE_SUCCESS {
    type: "ADD_EMPLOYEE_SUCCESS";
    payload: {
        apiSubmissionData: IApiEmployeeSubmission;
        storeData: IApiEmployee;
    };
}

export interface IEDIT_EMPLOYEE_SUCCESS {
    type: "EDIT_EMPLOYEE_SUCCESS";
    payload: {
        apiSubmissionData: IApiEmployeeSubmission;
        storeData: IApiEmployee;
    };
}

export interface IEMPLOYEE_LIST_CLEAR {
    type: "EMPLOYEE_LIST_CLEAR";
}

//Union Action Type
export type ActionType =
    | IFETCH_EMPLOYEES_SUCCESS
    | IDELETE_EMPLOYEE_SUCCESS
    | IADD_EMPLOYEE_SUCCESS
    | IEDIT_EMPLOYEE_SUCCESS
    | IEMPLOYEE_LIST_CLEAR;
