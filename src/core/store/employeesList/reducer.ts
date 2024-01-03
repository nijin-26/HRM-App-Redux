import { createSelector } from "reselect";
import { IApiEmployee } from "../../../interfaces/ApiDataInterface";
import { ActionType } from "./types";
import { RootState } from "..";

interface IEmployeesState {
  employeesList: IApiEmployee[];
  count: number | undefined;
}

const initialState: IEmployeesState = {
  count: undefined,
  employeesList: [],
};

const employeesReducer = (
  state = initialState,
  action: ActionType
): IEmployeesState => {
  switch (action.type) {
    case "FETCH_EMPLOYEES_SUCCESS":
      const employeeListIds = new Set(
        state.employeesList.map((employee) => employee.id)
      );

      return {
        ...state,
        count: action.payload.count,
        employeesList: [
          ...state.employeesList,
          ...action.payload.employees.filter(
            (employee) => !employeeListIds.has(employee.id)
          ),
        ],
      };
    case "DELETE_EMPLOYEE_SUCCESS":
      return {
        ...state,
        count: state.count ? state.count - 1 : state.count,
        employeesList: state.employeesList.filter(
          (emp) => emp.id !== action.payload
        ),
      };
    case "ADD_EMPLOYEE_SUCCESS":
      return {
        ...state,
        count: state.count ? state.count + 1 : 0,
        employeesList: [...state.employeesList, action.payload.storeData],
      };
    case "EDIT_EMPLOYEE_SUCCESS":
      return {
        ...state,
        employeesList: state.employeesList.map((employee) =>
          employee.id === action.payload.storeData.id
            ? action.payload.storeData
            : employee
        ),
      };
    case "EMPLOYEE_LIST_CLEAR":
      return {
        ...state,
        count: undefined,
        employeesList: [],
      };
    default:
      return state;
  }
};

export const selectEmployeesListSlice = (offset: number, limit: number) =>
  createSelector(
    (state: RootState) => state.employees.employeesList,
    (employeesList) => employeesList.slice(offset, offset + limit)
  );

export default employeesReducer;
