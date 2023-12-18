import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import employeesReducer, { IEmployeesState } from './employeesList/reducers';
import employeeReducer, { IEmployeeState } from './employeeData/reducer';
import dropdownReducer, { IDropdownsState } from './dropdownData/reducer';
import { thunk } from 'redux-thunk';

export interface IState {
    employees: IEmployeesState;
    dropdownData: IDropdownsState;
    employee: IEmployeeState;
}

const rootReducer = combineReducers({
    employees: employeesReducer,
    employee: employeeReducer,
    dropdownData: dropdownReducer,
});

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 10 });

const store = legacy_createStore(
    rootReducer,
    undefined,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
