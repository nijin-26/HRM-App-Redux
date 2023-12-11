import StyledAddEmployeeDetails from './AddEmployeeDetails.style';
import { EmployeeDetailsForm } from '../../components';

const AddEmployeeDetails: React.FC = () => {
    return (
        <StyledAddEmployeeDetails>
            <h2 className="text-center">Add Employee Details</h2>
            <EmployeeDetailsForm />
        </StyledAddEmployeeDetails>
    );
};

export default AddEmployeeDetails;
