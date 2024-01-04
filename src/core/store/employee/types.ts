import { IApiEmployee } from "../../../interfaces/ApiDataInterface";

//Action Types
export interface IFETCH_EMPLOYEE_REQUEST {
    type: "FETCH_EMPLOYEE_REQUEST";
}

export interface IFETCH_EMPLOYEE_SUCCESS {
    type: "FETCH_EMPLOYEE_SUCCESS";
    payload: IApiEmployee;
}

export type ActionType = IFETCH_EMPLOYEE_REQUEST | IFETCH_EMPLOYEE_SUCCESS;
