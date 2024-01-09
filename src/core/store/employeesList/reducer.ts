import { createSelector } from 'reselect';
import { IApiEmployee } from '../../../interfaces/ApiDataInterface';
import { ActionType } from './types';
import { RootState } from '..';
import { fillEmptySlotsWithValue } from '../../../utils';

interface IEmployeesState {
    employeesList: (IApiEmployee[] | null)[];
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
                employeesList: fillEmptySlotsWithValue(
                    updatedEmployeesList,
                    null
                ),
            };
        case 'DELETE_EMPLOYEE_SUCCESS':
            //remove deleted element from flattened employeesList
            const filteredEmployeesList = state.employeesList
                .flat()
                .filter((employee) => {
                    if (!employee) {
                        return true;
                    }
                    return employee.id !== action.payload.empIdToDelete;
                });

            //append the fetched employee to the end (if it exists)
            // if (action.payload.empToAppend) {
            //     filteredEmployeesList.push(action.payload.empToAppend);
            // }
            if (action.payload.empToAppend) {
                filteredEmployeesList.splice(
                    action.payload.insertIndex,
                    0,
                    action.payload.empToAppend
                );
            }

            //split flattened array back into limit sized smaller arrays
            const splitEmployeesList: (IApiEmployee[] | null)[] = [];
            console.log(filteredEmployeesList);
            let i = 0;
            while (i < filteredEmployeesList.length) {
                if (!filteredEmployeesList[i]) {
                    console.log('null seen');
                    splitEmployeesList.push(null);
                    i++;
                } else {
                    splitEmployeesList.push(
                        filteredEmployeesList.slice(i, i + 10) as IApiEmployee[]
                    );
                    i += 10;
                }
            }
            console.log('splitted array : ', splitEmployeesList);

            return {
                ...state,
                count: state.count ? state.count - 1 : state.count,
                employeesList: splitEmployeesList,
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
