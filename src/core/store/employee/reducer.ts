import { AxiosError } from 'axios';
import { IApiEmployee } from '../../../interfaces/ApiDataInterface';
import { ActionType } from './actions';

export interface IEmployeeState {
    employeeData: IApiEmployee | null;
    employeeFetchloading: boolean;
    employeeFetchError: AxiosError | null;
}

const initialState: IEmployeeState = {
    employeeData: null,
    employeeFetchloading: false,
    employeeFetchError: null,
};

const employeeReducer = (
    state = initialState,
    action: ActionType
): IEmployeeState => {
    switch (action.type) {
        case 'FETCH_EMPLOYEE_REQUEST':
            return {
                ...state,
                employeeFetchloading: true,
                employeeFetchError: null,
            };
        case 'FETCH_EMPLOYEE_SUCCESS':
            return {
                ...state,
                employeeData: action.payload,
                employeeFetchloading: false,
                employeeFetchError: null,
            };
        case 'FETCH_EMPLOYEE_FAILURE':
            return {
                ...state,
                employeeFetchloading: false,
                employeeFetchError: action.payload,
            };
    }
};

export default employeeReducer;
