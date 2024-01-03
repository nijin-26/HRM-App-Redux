import { useAppDispatch, useAppSelector } from '../hooks/storeHelpers';
import { Navigate, Outlet } from 'react-router-dom';
import { Header, Footer } from '../components';
import { fetchSkills } from '../core/store/dropdownData/skills/actions';
import { fetchDepartments } from '../core/store/dropdownData/departments/actions';
import { fetchRoles } from '../core/store/dropdownData/roles/actions';

const Layout: React.FC = () => {
    const dispatch = useAppDispatch();
    const isLoggedin = useAppSelector((state) => state.auth.isLoggedIn);

    if (isLoggedin) {
        dispatch(fetchSkills());
        dispatch(fetchDepartments());
        dispatch(fetchRoles());
    }

    return (
        <>
            <Header />
            <main>{isLoggedin ? <Outlet /> : <Navigate to={'/login'} />}</main>
            <Footer />
        </>
    );
};

export default Layout;
