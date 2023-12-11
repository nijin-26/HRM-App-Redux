import { Header, Footer } from '../components';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
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
