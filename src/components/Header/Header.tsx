import { Button } from "..";
import useAuth from "../../hooks/useAuth";
import { StyledHeader, Navbar } from "./Header.style";
import { Link, NavLink } from "react-router-dom";

const Header: React.FC = () => {
    const { logout } = useAuth();

    return (
        <StyledHeader>
            <Navbar>
                <Link to="/employees">
                    <h1 className="brand-logo">HRM APP</h1>
                </Link>
                <ul className="navlinks">
                    <li>
                        <NavLink to="/view-employee" end>
                            Search Employee
                        </NavLink>
                    </li>
                    <li>
                        <Button onClick={logout} className="outline">
                            Logout
                        </Button>
                    </li>
                </ul>
            </Navbar>
        </StyledHeader>
    );
};

export default Header;
