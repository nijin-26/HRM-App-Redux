import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/storeHelpers";
import { useEffect } from "react";
import StyledEditEmployeeDetails from "./EditEmployeeDetails.style";
import { EmployeeDetailsForm, Loader } from "../../components";
import { fetchEmployee } from "../../core/store/employee/actions";
import { selectEmployeeDetails } from "../../core/store/employee/reducer";
import {
    selectRequestError,
    selectRequestInProgress,
} from "../../core/store/requests/reducer";
import { REQUESTS_ENUM } from "../../core/store/requests/requestsEnum";
import { clearRequest } from "../../core/store/requests/actions";
import SEO from "../../components/common/SEO/SEO";

const EditEmployeeDetails: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { employeeId } = useParams();

    if (!employeeId) {
        navigate("/view-employee", { replace: true });
        return;
    }

    const employeeDetails = useAppSelector(selectEmployeeDetails);
    const employeeFetchLoading = useAppSelector(
        selectRequestInProgress(REQUESTS_ENUM.getEmployee)
    );
    const employeeFetchError = useAppSelector(
        selectRequestError(REQUESTS_ENUM.getEmployee)
    );

    useEffect(() => {
        dispatch(fetchEmployee(Number(employeeId)));
    }, [employeeId]);

    useEffect(() => {
        if (employeeFetchError) {
            dispatch(clearRequest("GET_EMPLOYEE"));
            navigate("/view-employee", { replace: true });
        }
    }, [employeeFetchError]);

    return (
        <>
            <SEO
                title="Edit Employee - HRM App"
                description="Edit selected employee"
            />
            {employeeFetchLoading ? (
                <Loader className="full-screen-loader" />
            ) : (
                employeeDetails &&
                employeeDetails.id === Number(employeeId) && (
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
