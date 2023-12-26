import { AxiosError } from 'axios';
import { IApiEmployee } from '../../../interfaces/ApiDataInterface';
import { ActionType } from './actions';
import { MultiValue } from 'react-select';
import { IReactSelectOption } from '../../../interfaces/common';

interface IEmployeesListFilter {
    employeeNameFilter: string;
    employeeSkillsFilter: MultiValue<IReactSelectOption>;
}

interface IEmployeesState {
    employeesList: IApiEmployee[];
    count: number | undefined;
    employeeAddLoading: boolean;
    employeeAddError: AxiosError | null;
    employeeEditLoading: boolean;
    employeeEditError: AxiosError | null;
    employeesListFilter: IEmployeesListFilter;
}

const initialState: IEmployeesState = {
    count: undefined,
    employeesList: [],
    employeeAddLoading: false,
    employeeAddError: null,
    employeeEditLoading: false,
    employeeEditError: null,
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
        case 'FETCH_EMPLOYEES_SUCCESS':
            return {
                ...state,
                count: action.payload.count,
                employeesList: [
                    ...state.employeesList,
                    ...action.payload.employees,
                ],
            };
        case 'DELETE_EMPLOYEE_SUCCESS':
            return {
                ...state,
                count: state.count ? state.count - 1 : state.count,
                employeesList: state.employeesList.filter(
                    (emp) => emp.id !== action.payload
                ),
            };
        case 'ADD_EMPLOYEE_REQUEST':
            return {
                ...state,
                employeeAddLoading: true,
                employeeAddError: null,
            };
        case 'ADD_EMPLOYEE_SUCCESS':
            return {
                ...state,
                employeeAddLoading: false,
                employeeAddError: null,
                count: state.count ? state.count + 1 : 0,
                employeesList: [
                    ...state.employeesList,
                    action.payload.storeData,
                ],
            };
        case 'ADD_EMPLOYEE_FAILURE':
            return {
                ...state,
                employeeAddLoading: false,
                employeeAddError: action.payload,
            };
        case 'EDIT_EMPLOYEE_REQUEST':
            return {
                ...state,
                employeeEditLoading: true,
                employeeEditError: null,
            };
        case 'EDIT_EMPLOYEE_SUCCESS':
            return {
                ...state,
                employeeEditLoading: false,
                employeeEditError: null,
                employeesList: state.employeesList.map((employee) =>
                    employee.id === action.payload.storeData.id
                        ? action.payload.storeData
                        : employee
                ),
            };
        case 'EDIT_EMPLOYEE_FAILURE':
            return {
                ...state,
                employeeEditLoading: false,
                employeeEditError: action.payload,
            };
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
