import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import StyledEditEmployeeDetails from './EditEmployeeDetails.style';
import { EmployeeDetailsForm, Loader } from '../../components';
import { IState } from '../../core/store';
import { modifyFetchedEmployeeData } from '../../utils';
import { fetchEmployee } from '../../core/store/employee/actions';

const EditEmployeeDetails: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { employeeId } = useParams();

    if (!employeeId) {
        navigate('/view-employee', { replace: true });
        return;
    }

    const employeeDetails = useSelector((state: IState) => {
        if (state.employee.employeeData) {
            return modifyFetchedEmployeeData(state.employee.employeeData);
        } else {
            return null;
        }
    });
    const employeeFetchLoading = useSelector(
        (state: IState) => state.employee.employeeFetchloading
    );
    const employeeFetchError = useSelector(
        (state: IState) => state.employee.employeeFetchError
    );

    useEffect(() => {
        dispatch<any>(fetchEmployee(Number(employeeId)));
    }, [employeeId]);

    useEffect(() => {
        if (employeeFetchError) {
            navigate('/view-employee', { replace: true });
        }
    }, [employeeFetchError]);

    return (
        <>
            {employeeFetchLoading ? (
                <Loader className="full-screen-loader" />
            ) : (
                employeeDetails && (
                    <StyledEditEmployeeDetails>
                        <h2 className="text-center">Edit Employee Details</h2>

                        <EmployeeDetailsForm
                            empId={Number(employeeId)}
                            prefillData={employeeDetails}
                        />
                    </StyledEditEmployeeDetails>
                )
            )}
        </>
    );
};

export default EditEmployeeDetails;
