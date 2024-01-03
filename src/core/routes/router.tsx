import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../../layout/Layout';
import ManageEmployees from '../../pages/ManageEmployees/ManageEmployees';
import ViewEmployeeDetails from '../../pages/ViewEmployeeDetails/ViewEmployeeDetails';
import SearchEmployee from '../../pages/SearchEmployee/SearchEmployee';
import AddEmployeeDetails from '../../pages/AddEmployeeDetails/AddEmployeeDetails';
import EditEmployeeDetails from '../../pages/EditEmployeeDetails/EditEmployeeDetails';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import AuthLayout from '../../layout/AuthLayout';
import Login from '../../pages/Login/Login';

const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <Login />,
            },
        ],
    },
    {
        element: <Layout />,
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
]);

export default router;
