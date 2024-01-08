import { StyledHeader, Navbar } from './Header.style';
import { Link, NavLink } from 'react-router-dom';

const Header: React.FC = () => {
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
                </ul>
            </Navbar>
        </StyledHeader>
    );
};

export default Header;
