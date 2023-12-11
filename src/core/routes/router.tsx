import { createBrowserRouter, Navigate } from 'react-router-dom';

import Layout from '../../layout/Layout';
import ManageEmployees from '../../pages/ManageEmployees/ManageEmployees';
import ViewEmployeeDetails from '../../pages/ViewEmployeeDetails/ViewEmployeeDetails';
import SearchEmployee from '../../pages/SearchEmployee/SearchEmployee';
import AddEmployeeDetails from '../../pages/AddEmployeeDetails/AddEmployeeDetails';
import EditEmployeeDetails from '../../pages/EditEmployeeDetails/EditEmployeeDetails';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';

const router = createBrowserRouter(
    [
        {
            element: <Layout></Layout>,
            children: [
                {
                    path: '/',
                    element: <Navigate to="employees" replace={true} />,
                },
                {
                    path: 'employees',
                    element: <ManageEmployees />,
                },
                {
                    path: 'add-employee',
                    element: <AddEmployeeDetails />,
                },
                {
                    path: 'edit-employee',
                    element: <Navigate to="/view-employee" replace={true} />,
                },
                {
                    path: 'edit-employee/:employeeId',
                    element: <EditEmployeeDetails />,
                },
                {
                    path: 'view-employee',
                    element: <SearchEmployee />,
                },
                {
                    path: 'view-employee/:employeeId',
                    element: <ViewEmployeeDetails />,
                },
            ],
            errorElement: <ErrorPage />,
        },
    ],
    {
        basename: import.meta.env.DEV ? '/' : '/HRM-app-react/',
    }
);

export default router;
