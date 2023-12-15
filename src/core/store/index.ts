import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import employeesReducer, { IEmployeesState } from './employees/reducers';
import dropdownReducer, { IDropdownsState } from './dropdownData/reducers';
import { thunk } from 'redux-thunk';

export interface IState {
    employees: IEmployeesState;
    dropdownData: IDropdownsState;
}

const rootReducer = combineReducers({
    employees: employeesReducer,
    dropdownData: dropdownReducer,
});

const store = legacy_createStore(
    rootReducer,
    undefined,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
