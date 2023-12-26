import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/storeHelpers';
import { useEffect } from 'react';
import StyledEditEmployeeDetails from './EditEmployeeDetails.style';
import { EmployeeDetailsForm, Loader } from '../../components';
import { modifyFetchedEmployeeData } from '../../utils';
import { fetchEmployee } from '../../core/store/employee/actions';
import { REQUESTS_ENUM } from '../../core/store/requests/requestsEnum';

const EditEmployeeDetails: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { employeeId } = useParams();

    if (!employeeId) {
        navigate('/view-employee', { replace: true });
        return;
    }

    const employeeDetails = useAppSelector((state) => {
        const employeeData = state.employee.employeeData;
        if (employeeData && employeeData.id === Number(employeeId)) {
            return modifyFetchedEmployeeData(employeeData);
        } else {
            return null;
        }
    });
    const employeeFetchInProgress = useAppSelector(
        (state) =>
            state.requests.requests.find(
                (req) => req.name === REQUESTS_ENUM.getEmployee
            )?.inProgress
    );
    const employeeFetchError = useAppSelector(
        (state) =>
            state.requests.requests.find(
                (req) => req.name === REQUESTS_ENUM.getEmployee
            )?.error
    );

    useEffect(() => {
        dispatch(fetchEmployee(Number(employeeId)));
    }, [employeeId]);

    useEffect(() => {
        if (employeeFetchError) {
            navigate('/view-employee', { replace: true });
        }
    }, [employeeFetchError]);

    return (
        <>
            {employeeFetchInProgress ? (
                <Loader className="full-screen-loader" />
            ) : (
                employeeDetails && (
                    <StyledEditEmployeeDetails>
                        <h2 className="text-center">Edit Employee Details</h2>

                        <EmployeeDetailsForm prefillData={employeeDetails} />
                    </StyledEditEmployeeDetails>
                )
            )}
        </>
    );
};

export default EditEmployeeDetails;
