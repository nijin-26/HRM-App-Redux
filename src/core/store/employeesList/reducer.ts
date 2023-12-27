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
    employeesListFilter: IEmployeesListFilter;
}

const initialState: IEmployeesState = {
    count: undefined,
    employeesList: [],
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
            const IdsOfFetchedList = new Set(
                action.payload.employees.map((employee) => employee.id)
            );

            return {
                ...state,
                count: action.payload.count,
                employeesList: [
                    ...action.payload.employees,
                    ...state.employeesList.filter(
                        (employee) => !IdsOfFetchedList.has(employee.id)
                    ),
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
        case 'ADD_EMPLOYEE_SUCCESS':
            return {
                ...state,
                count: state.count ? state.count + 1 : 0,
                employeesList: [
                    ...state.employeesList,
                    action.payload.storeData,
                ],
            };
        case 'EDIT_EMPLOYEE_SUCCESS':
            return {
                ...state,
                employeesList: state.employeesList.map((employee) =>
                    employee.id === action.payload.storeData.id
                        ? action.payload.storeData
                        : employee
                ),
            };
        case 'EMPLOYEE_LIST_CLEAR':
            return {
                ...state,
                count: 0,
                employeesList: [],
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
