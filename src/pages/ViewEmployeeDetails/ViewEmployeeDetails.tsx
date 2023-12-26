import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/storeHelpers';
import StyledEmpDetailsWrap from './ViewEmployeeDetails.style';
import { Loader, Chip, LinkButton, Button } from '../../components';
import profilePictureAvatar from '../../assets/images/employee-avatar.svg';
import { fetchEmployee } from '../../core/store/employee/actions';
import { modifyFetchedEmployeeData } from '../../utils';
import { REQUESTS_ENUM } from '../../core/store/requests/requestsEnum';

const ViewEmployeeDetails = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { employeeId } = useParams();

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

    const notAvailableString = 'N/A';
    const noSkillsString = 'No Skills Entered';

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
                    <StyledEmpDetailsWrap>
                        <div className="view-emp-card">
                            <div className="main-details">
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
                            <dl className="extended-details">
                                <div className="data-entry">
                                    <dt>Employee ID</dt>
                                    <dd className="emp-id">
                                        {employeeDetails.id ||
                                            notAvailableString}
                                    </dd>
                                </div>
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
                                    <dt>Skills</dt>
                                    <dd>
                                        {employeeDetails.skills.length ? (
                                            <ul className="selected-skills-list flex-container">
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
                            <LinkButton
                                to={`/edit-employee/${employeeId}`}
                                className="primary edit-emp-btn"
                            >
                                Edit Employee Details
                            </LinkButton>
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
