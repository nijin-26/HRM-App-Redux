import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./storeHelpers";
import { loginUser, logoutUser } from "../core/store/auth/actions";
import { getCookie, removeCookie, setCookie } from "../utils/cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signIn } from "../core/api/services/auth";

const useAuth = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [loginLoading, setLoginLoading] = useState(false);

    useEffect(() => {
        const accessToken = getCookie("accessToken");
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            const currentTime = Math.floor(Date.now() / 1000);

            //check if token expired
            if (decodedToken.exp && decodedToken.exp <= currentTime) {
                logout();
            } else {
                dispatch(loginUser());
            }
        }
    }, []);

    const login = async (username: string, password: string) => {
        setLoginLoading(true);
        try {
            const authResponse = await signIn({
                username,
                password,
            });
            if (authResponse) {
                const accessToken = authResponse.data.access_token;
                const refreshToken = authResponse.data.refresh_token;
                setCookie("accessToken", accessToken);
                setCookie("refreshToken", refreshToken);
                dispatch(loginUser());
                toast.success("Welcome. You are succesfully logged in.");
                navigate("/");
                setLoginLoading(false);
            }
        } catch (error: any) {
            if (error.status === 401) {
                toast.error("Invalid Username or Password");
            } else {
                toast.error("Could not login. Please try again");
            }
            console.log(error);
            setLoginLoading(false);
        }
    };

    const logout = () => {
        removeCookie("accessToken");
        removeCookie("refreshToken");
        dispatch(logoutUser());
    };

    return { login, logout, loginLoading };
};

export default useAuth;
