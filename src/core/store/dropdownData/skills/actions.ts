import { AxiosError, AxiosResponse } from 'axios';
import { IApiSkill } from '../../../../interfaces/ApiDataInterface';
import { API } from '../../../api/useApi';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { toast } from 'react-toastify';

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
export const fetchSkills = (): ThunkAction<
    Promise<void>,
    {},
    {},
    AnyAction
> => {
    return async (
        dispatch: ThunkDispatch<{}, {}, AnyAction>
    ): Promise<void> => {
        dispatch(fetchSkillsRequest());
        try {
            const response: AxiosResponse = await API.get('/skills');
            dispatch(fetchSkillsSuccess(response.data.data));
        } catch (error) {
            console.log(error);
            dispatch(fetchSkillsFailure(error as AxiosError));
            toast.error(
                'Could not fetch skills list. Please try reloading the page.'
            );
        }
    };
};
