import { Header, Footer } from '../components';
import { Outlet } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { fetchSkills } from '../core/store/dropdownData/skills/actions';
import { fetchDepartments } from '../core/store/dropdownData/departments/actions';
import { fetchRoles } from '../core/store/dropdownData/roles/actions';

const Layout: React.FC = () => {
    const dispatch = useDispatch();

    dispatch<any>(fetchSkills());
    dispatch<any>(fetchDepartments());
    dispatch<any>(fetchRoles());

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
