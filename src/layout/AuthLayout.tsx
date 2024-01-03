import { useAppSelector } from "../hooks/storeHelpers";
import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";

const AuthLayoutWrap = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AuthLayout: React.FC = () => {
  const isLoggedin = useAppSelector((state) => state.auth.isLoggedIn);

  return (
    <AuthLayoutWrap>
      {isLoggedin ? <Navigate to="/" replace={true} /> : <Outlet />}
    </AuthLayoutWrap>
  );
};

export default AuthLayout;
