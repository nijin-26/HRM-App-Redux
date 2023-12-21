import { API } from './config/axios';
import { getSkills, getDepartments, getRoles } from './services/dropdownData';
import {
    getEmployeesList,
    getEmployee,
    deleteEmployee,
    addEmployee,
} from './services/employees';

export {
    API,
    getSkills,
    getDepartments,
    getRoles,
    getEmployeesList,
    getEmployee,
    deleteEmployee,
    addEmployee,
};
