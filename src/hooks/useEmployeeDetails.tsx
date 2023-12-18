import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API } from '../core/api/useApi';
import { IState } from '../core/store';
import { Store } from 'redux';

const useEmployeeDetails = (searchEmployeeId: number) => {
    const dispatch = useDispatch();

    const getEmployeeById = (storeState: IState) => {
        const employeesList = storeState.employees.employeesList;

        return employeesList.find(
            (employee) => employee.id === searchEmployeeId
        );
    };

    const employeeInStore = useSelector((state: IState) =>
        getEmployeeById(state)
    );

    const [employee, setEmployee] = useState(employeeInStore || null);
    const [loading, setLoading] = useState(!employeeInStore);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployeeDetails = () => {};

        if (!employeeInStore) {
            fetchEmployeeDetails();
        }
    }, [searchEmployeeId]);

    return { employee, loading, error };
};
