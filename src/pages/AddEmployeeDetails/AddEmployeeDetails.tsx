import StyledAddEmployeeDetails from "./AddEmployeeDetails.style";
import { EmployeeDetailsForm } from "../../components";
import SEO from "../../components/common/SEO/SEO";

const AddEmployeeDetails: React.FC = () => {
    return (
        <StyledAddEmployeeDetails>
            <SEO title="Add Employee - HRM App" description="Add an Employee" />
            <h2 className="text-center">Add Employee Details</h2>
            <EmployeeDetailsForm />
        </StyledAddEmployeeDetails>
    );
};

export default AddEmployeeDetails;
