import { StyledHeader, Navbar } from './Header.style';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <StyledHeader>
            <Navbar>
                <a href="/employees">
                    <h1 className="brand-logo">HRM APP</h1>
                </a>
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
