import { ActionType } from './actions';
import { IReactSelectOption } from '../../../../interfaces/common';
import { modifySelectOptionsArray } from '../../../../utils';

interface IDepartmentsState {
    departmentsData: IReactSelectOption[];
    departmentsFetchLoading: boolean;
    departmentsFetchError: Error | null;
}

const initialState: IDepartmentsState = {
    departmentsData: [],
    departmentsFetchLoading: false,
    departmentsFetchError: null,
};

const departmentsReducer = (
    state = initialState,
    action: ActionType
): IDepartmentsState => {
    switch (action.type) {
        case 'FETCH_DEPARTMENTS_REQUEST':
            return {
                ...state,
                departmentsFetchLoading: true,
            };
        case 'FETCH_DEPARTMENTS_SUCCESS':
            return {
                ...state,
                departmentsFetchLoading: false,
                departmentsFetchError: null,
                departmentsData: modifySelectOptionsArray(
                    action.payload,
                    'department'
                ),
            };
        case 'FETCH_DEPARTMENTS_FAILURE':
            return {
                ...state,
                departmentsFetchLoading: false,
                departmentsFetchError: action.payload,
            };
        default:
            return state;
    }
};

export default departmentsReducer;
