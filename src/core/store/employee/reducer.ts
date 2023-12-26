import { IApiEmployee } from '../../../interfaces/ApiDataInterface';
import { ActionType } from './actions';

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

export default employeeReducer;
