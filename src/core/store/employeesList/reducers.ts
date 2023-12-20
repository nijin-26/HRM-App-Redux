import { AxiosError } from 'axios';
import { IApiEmployee } from '../../../interfaces/ApiDataInterface';
import { ActionType } from './actions';
import { MultiValue } from 'react-select';
import { IReactSelectOption } from '../../../interfaces/common';

interface IEmployeesListFilter {
    employeeNameFilter: string;
    employeeSkillsFilter: MultiValue<IReactSelectOption>;
}

export interface IEmployeesState {
    employeesList: IApiEmployee[];
    count: number;
    employeesFetchloading: boolean;
    employeesFetchError: AxiosError | null;
    employeeDeleteLoading: boolean;
    employeeDeleteError: AxiosError | null;
    employeeAddLoading: boolean;
    employeeAddError: AxiosError | null;
    employeesListFilter: IEmployeesListFilter;
}

const initialState: IEmployeesState = {
    count: 0,
    employeesList: [],
    employeesFetchloading: false,
    employeesFetchError: null,
    employeeDeleteLoading: false,
    employeeDeleteError: null,
    employeeAddLoading: false,
    employeeAddError: null,
    employeesListFilter: {
        employeeNameFilter: '',
        employeeSkillsFilter: [],
    },
};

const employeesReducer = (
    state = initialState,
    action: ActionType
): IEmployeesState => {
    switch (action.type) {
        case 'FETCH_EMPLOYEES_REQUEST':
            return {
                ...state,
                employeesFetchloading: true,
                employeesFetchError: null,
            };
        case 'FETCH_EMPLOYEES_SUCCESS':
            return {
                ...state,
                count: action.payload.count,
                employeesList: [...action.payload.employees],
                employeesFetchloading: false,
                employeesFetchError: null,
            };
        case 'FETCH_EMPLOYEES_FAILURE':
            return {
                ...state,
                employeesFetchloading: false,
                employeesFetchError: action.payload,
            };
        case 'DELETE_EMPLOYEE_REQUEST':
            return {
                ...state,
                employeeDeleteLoading: true,
                employeeDeleteError: null,
            };
        case 'DELETE_EMPLOYEE_SUCCESS':
            return {
                ...state,
                count: state.count - 1,
                employeesList: state.employeesList.filter(
                    (emp) => emp.id !== action.payload
                ),
                employeeDeleteLoading: false,
                employeeDeleteError: null,
            };
        case 'DELETE_EMPLOYEE_FAILURE':
            return {
                ...state,
                employeeDeleteLoading: false,
                employeeDeleteError: action.payload,
            };
        case 'ADD_EMPLOYEE_REQUEST':
            return {
                ...state,
                employeeAddLoading: true,
                employeeAddError: null,
            };
        // case 'ADD_EMPLOYEE_SUCCESS': return {
        //     ...state,
        //     employeeAddLoading: false,
        //     employeeAddError: null,
        //     count: state.count + 1,
        //     employeesList: [...state.employeesList, action.payload]
        // }
        case 'EMPLOYEE_NAME_FILTER_CHANGE':
            return {
                ...state,
                employeesListFilter: {
                    ...state.employeesListFilter,
                    employeeNameFilter: action.payload,
                },
            };
        case 'EMPLOYEE_SKILLS_FILTER_CHANGE':
            return {
                ...state,
                employeesListFilter: {
                    ...state.employeesListFilter,
                    employeeSkillsFilter: action.payload,
                },
            };
        case 'EMPLOYEE_LIST_FILTER_CLEAR':
            return {
                ...state,
                employeesListFilter: {
                    employeeNameFilter: '',
                    employeeSkillsFilter: [],
                },
            };
        default:
            return state;
    }
};

export default employeesReducer;
