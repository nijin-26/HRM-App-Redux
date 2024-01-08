import { createSelector } from 'reselect';
import { IApiEmployee } from '../../../interfaces/ApiDataInterface';
import { ActionType } from './types';
import { RootState } from '..';

interface IEmployeesState {
    employeesList: IApiEmployee[][];
    count: number | undefined;
}

const initialState: IEmployeesState = {
    count: undefined,
    employeesList: [],
};

const employeesReducer = (
    state = initialState,
    action: ActionType
): IEmployeesState => {
    switch (action.type) {
        case 'FETCH_EMPLOYEES_SUCCESS':
            const updatedEmployeesList = [...state.employeesList];
            const { offset, limit, response } = action.payload;

            const rowIndex = Math.floor(offset / limit);
            updatedEmployeesList[rowIndex] = response.employees;
            return {
                ...state,
                count: response.count,
                employeesList: updatedEmployeesList,
            };
        case 'DELETE_EMPLOYEE_SUCCESS':
            // const filteredEmployeeList = state.employeesList
            //     .flat()
            //     .filter((employee) => employee.id !== action.payload);

            return {
                ...state,
                count: state.count ? state.count - 1 : state.count,
                //TODO:
                // employeesList:
            };
        case 'EMPLOYEE_LIST_CLEAR':
            return {
                ...state,
                count: undefined,
                employeesList: [],
            };
        default:
            return state;
    }
};

export const selectEmployeesListSlice = (offset: number, limit: number) =>
    createSelector(
        (state: RootState) => state.employees.employeesList,
        (employeesList) => {
            const employeeSlice = employeesList[Math.floor(offset / limit)];
            if (employeeSlice) {
                return employeeSlice;
            }
            return [];
        }
    );

export const selectEmployeesList = createSelector(
    (state: RootState) => state.employees.employeesList,
    (employeesList) => employeesList.flat()
);

export default employeesReducer;
