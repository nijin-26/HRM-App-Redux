import {
    legacy_createStore as createStore,
    combineReducers,
    applyMiddleware,
    UnknownAction,
} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import employeesReducer from './employeesList/reducer';
import employeeReducer from './employee/reducer';
import dropdownReducer from './dropdownData/reducer';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { ThunkAction, thunk } from 'redux-thunk';

const rootReducer = combineReducers({
    employees: employeesReducer,
    employee: employeeReducer,
    dropdownData: dropdownReducer,
});

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 10 });

const store = createStore(
    rootReducer,
    undefined,
    composeEnhancers(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = Promise<any>> = ThunkAction<
    ReturnType,
    RootState,
    undefined,
    UnknownAction
>;

export default store;
