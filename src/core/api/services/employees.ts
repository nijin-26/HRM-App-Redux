import {
    IApiEmployeePostRepsonse,
    IApiEmployeeSubmission,
    IApiFetchEmployee,
    IApiFetchEmployeesArray,
} from '../../../interfaces/ApiDataInterface';
import { API } from '../config/axios';

export const getEmployeesList = (
    limit: number,
    offset: number,
    sortBy: string,
    sortDir: string
) => {
    return API.get<IApiFetchEmployeesArray>(
        `/employee?limit=${limit}&offset=${offset}&sortBy=${sortBy}&sortDir=${sortDir}`
    );
};

export const getEmployee = (employeeId: number) => {
    return API.get<IApiFetchEmployee>(`/employee/${employeeId}`);
};

export const deleteEmployee = (employeeId: number) => {
    return API.delete(`/employee/${employeeId}`);
};

export const addEmployee = (employeeData: IApiEmployeeSubmission) => {
    return API.post<IApiEmployeePostRepsonse>('/employee', employeeData);
};

export const editEmployee = (
    employeeId: number,
    employeeData: IApiEmployeeSubmission
) => {
    return API.patch(`/employee/${employeeId}`, employeeData);
};
