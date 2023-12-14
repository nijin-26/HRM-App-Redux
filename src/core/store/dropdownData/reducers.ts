import { AxiosError } from 'axios';
import { ActionType } from './actions';
import { IReactSelectOption } from '../../../interfaces/common';
import { modifySelectOptionsArray } from '../../../utils';

export interface IDropdownsState {
    skills: IReactSelectOption[];
    skillsFetchLoading: boolean;
    skillsFetchError: AxiosError | null;
}

const initialState: IDropdownsState = {
    skills: [],
    skillsFetchLoading: false,
    skillsFetchError: null,
};

const dropdownReducer = (
    state = initialState,
    action: ActionType
): IDropdownsState => {
    switch (action.type) {
        case 'FETCH_SKILLS_REQUEST':
            return {
                ...state,
                skillsFetchLoading: true,
            };
        case 'FETCH_SKILLS_SUCCESS':
            return {
                ...state,
                skillsFetchLoading: false,
                skillsFetchError: null,
                skills: modifySelectOptionsArray(action.payload, 'skill'),
            };
        case 'FETCH_SKILLS_FAILURE':
            return {
                ...state,
                skillsFetchLoading: false,
                skillsFetchError: action.payload,
            };
        default:
            return state;
    }
};

export default dropdownReducer;
