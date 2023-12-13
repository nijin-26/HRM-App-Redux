import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import employeesReducer, { IEmployeesState } from './employees/reducers';
import { thunk } from 'redux-thunk';

export interface IState {
    employees: IEmployeesState;
}

const rootReducer = combineReducers({
    employees: employeesReducer,
});

const store = legacy_createStore(
    rootReducer,
    undefined,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
