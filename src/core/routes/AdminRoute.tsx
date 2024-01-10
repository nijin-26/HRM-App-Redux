import { useAppSelector } from "../../hooks/storeHelpers";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
    const user = useAppSelector((state) => state.auth);

    const location = useLocation();
    const selectedEmployee = location.pathname?.split("/")[2];

    // has access if current user is an admin or it is their own edit page
    const userHasAccess =
        user.isAdmin || String(user.userID) === selectedEmployee;

    return userHasAccess ? children : <Navigate to="/" replace={true} />;
};

export default AdminRoute;
