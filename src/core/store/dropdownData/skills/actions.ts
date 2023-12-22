import { AxiosError } from 'axios';
import { IApiSkill } from '../../../../interfaces/ApiDataInterface';
import { toast } from 'react-toastify';
import { getSkills } from '../../../api';
import { AppDispatch, AppThunk } from '../..';

//Actions definitions
interface IFETCH_SKILLS_REQUEST {
    type: 'FETCH_SKILLS_REQUEST';
}

interface IFETCH_SKILLS_SUCCESS {
    type: 'FETCH_SKILLS_SUCCESS';
    payload: IApiSkill[];
}

interface IFETCH_SKILLS_FAILURE {
    type: 'FETCH_SKILLS_FAILURE';
    payload: AxiosError;
}

export type ActionType =
    | IFETCH_SKILLS_REQUEST
    | IFETCH_SKILLS_SUCCESS
    | IFETCH_SKILLS_FAILURE;

//Action Creators

//SKILLS FETCH
export const fetchSkillsRequest = (): IFETCH_SKILLS_REQUEST => ({
    type: 'FETCH_SKILLS_REQUEST',
});

export const fetchSkillsSuccess = (
    employeesData: IApiSkill[]
): IFETCH_SKILLS_SUCCESS => ({
    type: 'FETCH_SKILLS_SUCCESS',
    payload: employeesData,
});

export const fetchSkillsFailure = (
    error: AxiosError
): IFETCH_SKILLS_FAILURE => ({
    type: 'FETCH_SKILLS_FAILURE',
    payload: error,
});

//Thunk Action
export const fetchSkills = (): AppThunk => {
    return async (dispatch: AppDispatch): Promise<void> => {
        dispatch(fetchSkillsRequest());
        try {
            const { data: fetchResponse } = await getSkills();
            dispatch(fetchSkillsSuccess(fetchResponse.data));
        } catch (error) {
            console.log(error);
            dispatch(fetchSkillsFailure(error as AxiosError));
            toast.error(
                'Could not fetch skills list. Please try reloading the page.'
            );
        }
    };
};
