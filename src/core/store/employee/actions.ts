import { IApiEmployee } from '../../../interfaces/ApiDataInterface';
import { toast } from 'react-toastify';
import { AppDispatch, AppThunk, RootState } from '..';
import { getEmployee } from '../../api';
import { requestHelper } from '../requests/actions';
import { REQUESTS_ENUM } from '../requests/requestsEnum';
import { EmptyResponseDataError } from '../../../utils/errors';

//Action Types
interface IFETCH_EMPLOYEE_REQUEST {
    type: 'FETCH_EMPLOYEE_REQUEST';
}

interface IFETCH_EMPLOYEE_SUCCESS {
    type: 'FETCH_EMPLOYEE_SUCCESS';
    payload: IApiEmployee;
}

export type ActionType = IFETCH_EMPLOYEE_REQUEST | IFETCH_EMPLOYEE_SUCCESS;

//Action Creators
export const fetchEmployeeRequest = (): IFETCH_EMPLOYEE_REQUEST => ({
    type: 'FETCH_EMPLOYEE_REQUEST',
});

export const fetchEmployeeSuccess = (
    employeeData: IApiEmployee
): IFETCH_EMPLOYEE_SUCCESS => ({
    type: 'FETCH_EMPLOYEE_SUCCESS',
    payload: employeeData,
});

export const fetchEmployee = (employeeId: number): AppThunk => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const employeesList = getState().employees.employeesList;
        const employeeInState = employeesList.find(
            (employee) => employee.id === employeeId
        );

        try {
            if (!employeeInState) {
                const { data: response } = await requestHelper(
                    dispatch,
                    REQUESTS_ENUM.getEmployee,
                    async () => {
                        const response = await getEmployee(employeeId);
                        if (!response.data.data) {
                            throw new EmptyResponseDataError(
                                'No data in response'
                            );
                        }
                        return response;
                    }
                );
                dispatch(fetchEmployeeSuccess(response.data));
            } else {
                dispatch(fetchEmployeeSuccess(employeeInState));
            }
        } catch (error) {
            console.log(error);
            if (error instanceof EmptyResponseDataError) {
                toast.error('Could not find the requested employee.');
            } else {
                toast.error(
                    'Could not fetch employee details. Please try reloading the page.'
                );
            }
        }
    };
};
