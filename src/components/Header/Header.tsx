import { Button } from "..";
import { useAppSelector } from "../../hooks/storeHelpers";
import useAuth from "../../hooks/useAuth";
import { StyledHeader, Navbar } from "./Header.style";
import { Link, NavLink } from "react-router-dom";

import avatar from "../../assets/images/employee-avatar.svg";

const Header: React.FC = () => {
    const { logout } = useAuth();

    const userName = useAppSelector((state) => state.auth.userName);
    return (
        <StyledHeader>
            <Navbar>
                <Link to="/employees">
                    <h1 className="brand-logo">HRM APP</h1>
                </Link>
                <ul className="navlinks">
                    <li>
                        <div className="navbar-actions">
                            <div className="user-card">
                                <img
                                    src={avatar}
                                    alt="user-image"
                                    className="user-card-image"
                                />
                                <div className="user-card-body">
                                    <span style={{ fontWeight: 700 }}>
                                        {userName.charAt(0).toUpperCase() +
                                            userName.slice(1)}
                                    </span>
                                </div>
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        logout();
                                    }}
                                    className="logout-btn material-symbols-rounded"
                                >
                                    logout
                                </span>
                            </div>
                        </div>
                        {/* <Button onClick={logout} className="outline">
                            Logout
                        </Button> */}
                    </li>
                </ul>
            </Navbar>
        </StyledHeader>
    );
};

export default Header;
