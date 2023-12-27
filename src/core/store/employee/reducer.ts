import { RootState } from '..';
import { IApiEmployee } from '../../../interfaces/ApiDataInterface';
import { modifyFetchedEmployeeData } from '../../../utils';
import { ActionType } from './actions';
import { createSelector } from 'reselect';

interface IEmployeeState {
    employeeData: IApiEmployee | null;
}

const initialState: IEmployeeState = {
    employeeData: null,
};

const employeeReducer = (
    state = initialState,
    action: ActionType
): IEmployeeState => {
    switch (action.type) {
        // case 'FETCH_EMPLOYEE_REQUEST':
        //     return {
        //         ...state,
        //         employeeData: null,
        //     };
        case 'FETCH_EMPLOYEE_SUCCESS':
            return {
                ...state,
                employeeData: action.payload,
            };
        default:
            return state;
    }
};

export const selectEmployeeDetails = (employeeId: string) =>
    createSelector(
        (state: RootState) => state.employee.employeeData,
        (employeeData) => {
            if (employeeData && employeeData.id === Number(employeeId)) {
                return modifyFetchedEmployeeData(employeeData);
            } else {
                return null;
            }
        }
    );

export default employeeReducer;
