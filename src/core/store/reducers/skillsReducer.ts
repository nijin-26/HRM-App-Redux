import { IReactSelectOption } from '../../../interfaces/common';

const initialState = {
    skills: [] as IReactSelectOption[],
};

const skillsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SKILLS_LOADED':
            {
                return action.payload;
            }

            deafult: return state;
    }
};
