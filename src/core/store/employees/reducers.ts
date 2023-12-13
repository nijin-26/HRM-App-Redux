import { AxiosError } from 'axios';
import { IApiEmployee } from '../../../interfaces/ApiDataInterface';
import { ActionType } from './actions';

export interface IEmployeesState {
    employeesList: IApiEmployee[];
    count: number;
    loading: boolean;
    error: AxiosError | null;
}

const initialState: IEmployeesState = {
    count: 0,
    employeesList: [],
    loading: false,
    error: null,
};

const employeesReducer = (
    state = initialState,
    action: ActionType
): IEmployeesState => {
    switch (action.type) {
        case 'FETCH_EMPLOYEES_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_EMPLOYEES_SUCCESS':
            return {
                ...state,
                count: action.payload.count,
                employeesList: [...action.payload.employees],
                loading: false,
                error: null,
            };
        case 'FETCH_EMPLOYEES_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default employeesReducer;
