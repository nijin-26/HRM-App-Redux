import { combineReducers } from 'redux';
import skillsReducer, { ISkillsState } from './skills/reducer';
import rolesReducer, { IRolesState } from './roles/reducer';
import departmentsReducer, { IDepartmentsState } from './departments/reducer';

export interface IDropdownsState {
    skills: ISkillsState;
    departments: IDepartmentsState;
    roles: IRolesState;
}

const dropdownReducer = combineReducers({
    skills: skillsReducer,
    departments: departmentsReducer,
    roles: rolesReducer,
});

export default dropdownReducer;
