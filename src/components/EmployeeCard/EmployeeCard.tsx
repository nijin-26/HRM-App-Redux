import { CardBody, CardContainer, CardHeader } from "./EmployeeCard.styles";

import avatar from "../../assets/images/employee-avatar.svg";
import { IEmployeeListing } from "../../interfaces/common";
import { Link, useNavigate } from "react-router-dom";
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
        <CardContainer>
            <CardHeader>
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
                    {/* <div>
            <span className="material-symbols-rounded">calendar_month</span>
            <p>{employeeData.dateOfJoining}</p>
          </div> */}
                </div>
                <div className="divider"></div>
                <div className="icons">
                    <span
                        className="material-symbols-rounded"
                        onClick={() =>
                            navigate(`/view-employee/${employeeData.id}`)
                        }
                    >
                        visibility
                    </span>

                    {user.isAdmin && (
                        <>
                            <Link to={`/edit-employee/${employeeData.id}`}>
                                <span className="material-symbols-rounded">
                                    edit_square
                                </span>
                            </Link>
                            <span
                                className="material-symbols-rounded"
                                onClick={() => {
                                    setDeleteEmployee(employeeData.id);
                                    setIsModalOpen(true);
                                }}
                            >
                                person_remove
                            </span>
                        </>
                    )}
                </div>
            </CardBody>
        </CardContainer>
    );
};

export default EmployeeCard;

// ! <<<<<<<<<< Horizontal Card >>>>>>>>>>>>>>>

// const EmployeeCard = ({ employeeData }: { employeeData: IEmployeeListing }) => {
//   console.log(employeeData.photoId);
//   return (
//     <CardContainer>
//       <div className="employee_image_container">
//         <img
//           src={employeeData.photoId === "" ? avatar : employeeData.photoId}
//           alt={"Employee Image"}
//         />
//         <span>{employeeData?.id}</span>
//       </div>

//       <div className="employee_details">
//         <h3>{employeeData.fullName}</h3>
//         <p className="role">{`${employeeData.role} - ${employeeData.department}`}</p>
//         <p>{employeeData.email}</p>
//       </div>
//     </CardContainer>
//   );
// };

// export default EmployeeCard;
