import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/storeHelpers";
import StyledEmpDetailsWrap from "./ViewEmployeeDetails.style";
import { Loader, Chip, LinkButton, Button } from "../../components";
import profilePictureAvatar from "../../assets/images/employee-avatar.svg";
import { fetchEmployee } from "../../core/store/employee/actions";
import {
    selectRequestError,
    selectRequestInProgress,
} from "../../core/store/requests/reducer";
import { REQUESTS_ENUM } from "../../core/store/requests/requestsEnum";
import { selectEmployeeDetails } from "../../core/store/employee/reducer";
import { clearRequest } from "../../core/store/requests/actions";
import SEO from "../../components/common/SEO/SEO";

const ViewEmployeeDetails = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { employeeId } = useParams();

    if (!employeeId) {
        navigate("/view-employee", { replace: true });
        return;
    }

    const user = useAppSelector((state) => state.auth);
    const employeeDetails = useAppSelector(selectEmployeeDetails);
    const employeeFetchLoading = useAppSelector(
        selectRequestInProgress(REQUESTS_ENUM.getEmployee)
    );
    const employeeFetchError = useAppSelector(
        selectRequestError(REQUESTS_ENUM.getEmployee)
    );

    const notAvailableString = "N/A";
    const noSkillsString = "No Skills Entered";

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
                title={
                    employeeDetails?.id === Number(employeeId)
                        ? `${employeeDetails?.firstName} - HRM App`
                        : ""
                }
                description="View page of employee"
            />
            {employeeFetchLoading ? (
                <Loader className="full-screen-loader" />
            ) : (
                employeeDetails &&
                employeeDetails.id === Number(employeeId) && (
                    <StyledEmpDetailsWrap>
                        <div className="view-emp-card">
                            <div className="primary-employee-details">
                                <img
                                    src={
                                        employeeDetails.photoId ||
                                        profilePictureAvatar
                                    }
                                    alt="Profile Photo"
                                    className="profile-photo"
                                    draggable="false"
                                />
                                <p className="full-name">
                                    {`${employeeDetails.firstName} ${employeeDetails.lastName}` ||
                                        `Name : ${notAvailableString}`}
                                </p>
                                <p className="role">
                                    {employeeDetails.role?.label ||
                                        `Role : ${notAvailableString}`}
                                </p>
                                <p className="department">
                                    {employeeDetails.department?.label ||
                                        `Department : ${notAvailableString}`}
                                </p>
                                <p className="location">
                                    {employeeDetails.location?.label ||
                                        `Location : ${notAvailableString}`}
                                </p>
                            </div>
                            <dl className="secondary-employee-details">
                                <div className="data-entry">
                                    <dt>Email</dt>
                                    <dd className="email">
                                        {employeeDetails.email ||
                                            notAvailableString}
                                    </dd>
                                </div>
                                <div className="data-entry">
                                    <dt>Gender</dt>
                                    <dd className="gender">
                                        {employeeDetails.gender ||
                                            notAvailableString}
                                    </dd>
                                </div>
                                <div className="data-entry">
                                    <dt>Date of Birth</dt>
                                    <dd className="dob">
                                        {employeeDetails.dob ||
                                            notAvailableString}
                                    </dd>
                                </div>
                                <div className="data-entry">
                                    <dt>Date of Joining</dt>
                                    <dd className="doj">
                                        {employeeDetails.dateOfJoining ||
                                            notAvailableString}
                                    </dd>
                                </div>
                                <div className="data-entry">
                                    <dt>Address</dt>
                                    <dd className="address">
                                        {employeeDetails.address ||
                                            notAvailableString}
                                    </dd>
                                </div>
                                <div className="data-entry">
                                    <dt>Mobile Number</dt>
                                    <dd className="mobile-number">
                                        {employeeDetails.phone ||
                                            notAvailableString}
                                    </dd>
                                </div>
                                <div className="data-entry">
                                    <dt>Skills</dt>
                                    <dd>
                                        {employeeDetails.skills.length ? (
                                            <ul className="selected-skills-list">
                                                {employeeDetails.skills?.map(
                                                    (skill) => (
                                                        <li key={skill.value}>
                                                            <Chip>
                                                                {skill.label}
                                                            </Chip>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        ) : (
                                            noSkillsString
                                        )}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        <div className="navigation-controls">
                            {user.isAdmin ||
                            String(user.userID) === employeeId ? (
                                <LinkButton
                                    to={`/edit-employee/${employeeId}`}
                                    className="primary edit-emp-btn"
                                >
                                    Edit Employee Details
                                </LinkButton>
                            ) : null}
                            <Button
                                className="primary"
                                onClick={() => navigate(-1)}
                            >
                                Go Back
                            </Button>
                        </div>
                    </StyledEmpDetailsWrap>
                )
            )}
        </>
    );
};

export default ViewEmployeeDetails;
