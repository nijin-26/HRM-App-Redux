import { AxiosError } from 'axios';
import { ActionType } from './actions';
import { IReactSelectOption } from '../../../../interfaces/common';
import { modifySelectOptionsArray } from '../../../../utils';

export interface ISkillsState {
    skillsData: IReactSelectOption[];
    skillsFetchLoading: boolean;
    skillsFetchError: AxiosError | null;
}

const initialState: ISkillsState = {
    skillsData: [],
    skillsFetchLoading: false,
    skillsFetchError: null,
};

const skillsReducer = (
    state = initialState,
    action: ActionType
): ISkillsState => {
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
                skillsData: modifySelectOptionsArray(action.payload, 'skill'),
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

export default skillsReducer;
