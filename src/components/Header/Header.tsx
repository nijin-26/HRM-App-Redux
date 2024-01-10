import { useAppSelector } from "../../hooks/storeHelpers";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { StyledHeader, Navbar } from "./Header.style";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../assets/images/employee-avatar.svg";
import { toast } from "react-toastify";
import { LogoutModal, Modal } from "..";

const Header: React.FC = () => {
    const { logout } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const user = useAppSelector((state) => state.auth);

    const navigate = useNavigate();
    return (
        <StyledHeader>
            <Navbar>
                <Link to="/employees">
                    <h1 className="brand-logo">HRM APP</h1>
                </Link>
                <ul className="navlinks">
                    <li>
                        <div className="navbar-actions">
                            <div
                                className="user-card"
                                onClick={() =>
                                    user.userID
                                        ? navigate(
                                              `view-employee/${user.userID}`
                                          )
                                        : toast.info("User Profile Not Found.")
                                }
                            >
                                <img
                                    src={
                                        user.imageURL !== ""
                                            ? user.imageURL
                                            : avatar
                                    }
                                    alt="user-image"
                                    className="user-card-image"
                                />
                                <div className="user-card-body">
                                    <span style={{ fontWeight: 700 }}>
                                        {user.userName
                                            ?.charAt(0)
                                            .toUpperCase() +
                                            user.userName.slice(1)}
                                    </span>
                                </div>
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // logout();
                                        setIsModalOpen(true);
                                    }}
                                    className="logout-btn material-symbols-rounded"
                                >
                                    logout
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
                <Modal
                    $isOpen={isModalOpen}
                    cancelClickHandler={() => setIsModalOpen(false)}
                >
                    <LogoutModal
                        confirmClickHandler={logout}
                        cancelClickHandler={() => setIsModalOpen(false)}
                    />
                </Modal>
            </Navbar>
        </StyledHeader>
    );
};

export default Header;
