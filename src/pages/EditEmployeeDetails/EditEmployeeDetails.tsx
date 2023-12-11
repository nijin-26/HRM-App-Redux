import { useParams, useNavigate } from 'react-router-dom';
import useApi from '../../core/api/useApi';
import { useEffect } from 'react';
import StyledEditEmployeeDetails from './EditEmployeeDetails.style';
import { EmployeeDetailsForm, Loader } from '../../components';
import { toast } from 'react-toastify';
import { IApiFetchEmployee } from '../../interfaces/ApiDataInterface';
import { modifyFetchedEmployeeData } from '../../utils';

const EditEmployeeDetails: React.FC = () => {
    const { employeeId } = useParams();
    const navigate = useNavigate();

    const { response, loading, error } = useApi<IApiFetchEmployee>(
        'GET',
        `/employee/${employeeId}`
    );

    useEffect(() => {
        if (error) {
            toast.error(`Could not fetch the requested employee's details`);
            navigate('/', { replace: true });
        }

        if (response && !response.data) {
            toast.error('Could not find the requested employee.');
            navigate('/view-employee', { replace: true });
        }
    }, [loading]);

    return (
        <>
            {loading && <Loader className="full-screen-loader" />}
            {response?.data && (
                <StyledEditEmployeeDetails>
                    <h2 className="text-center">Edit Employee Details</h2>

                    <EmployeeDetailsForm
                        empId={employeeId}
                        prefillData={modifyFetchedEmployeeData(response.data)}
                    />
                </StyledEditEmployeeDetails>
            )}
        </>
    );
};

export default EditEmployeeDetails;
