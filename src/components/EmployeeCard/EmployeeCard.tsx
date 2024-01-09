import { CardBody, CardContainer, CardHeader } from "./EmployeeCard.styles";

import avatar from "../../assets/images/employee-avatar.svg";
import { IEmployeeListing } from "../../interfaces/common";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/storeHelpers";

const EmployeeCard = ({
    employeeData,
    setIsModalOpen,
    setDeleteEmployee,
}: {
    employeeData: IEmployeeListing;
    setIsModalOpen: (isOpen: boolean) => void;
    setDeleteEmployee: (deleteEmployeeId: number) => void;
}) => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth);

    return (
        <CardContainer
            onClick={() => navigate(`/view-employee/${employeeData.id}`)}
        >
            <CardHeader>
                <p className="employee-id">ID: {employeeData.id}</p>
                {user.isAdmin && (
                    <div className="icons">
                        <span
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/edit-employee/${employeeData.id}`);
                            }}
                            className="material-symbols-rounded"
                        >
                            edit_square
                        </span>
                        <span
                            className="material-symbols-rounded"
                            onClick={(e) => {
                                e.stopPropagation();
                                setDeleteEmployee(employeeData.id);
                                setIsModalOpen(true);
                            }}
                        >
                            person_remove
                        </span>
                    </div>
                )}
                <img
                    src={
                        employeeData.photoId === ""
                            ? avatar
                            : employeeData.photoId
                    }
                    alt=""
                />
            </CardHeader>
            <CardBody>
                <div className="card_header">
                    <h3>{employeeData.fullName}</h3>
                    <p className="role">{`${employeeData.role} - ${employeeData.department}`}</p>
                </div>

                <div className="details_wrapper">
                    <div>
                        <span className="material-symbols-rounded">mail</span>
                        <p>
                            <a href={`mailto:${employeeData.email}`}>
                                {employeeData.email}
                            </a>
                        </p>
                    </div>
                    <div>
                        <span className="material-symbols-rounded">
                            location_on
                        </span>
                        <p>{employeeData.location}</p>
                    </div>
                    <div>
                        <span className="material-symbols-rounded">
                            calendar_month
                        </span>
                        <p>{employeeData.dateOfJoining}</p>
                    </div>
                </div>
            </CardBody>
        </CardContainer>
    );
};

export default EmployeeCard;
