import useAuth from "../../hooks/useAuth";
import StyledLoginWrap from "./Login.style";
import { Form, Formik } from "formik";
import { Button, CustomInput, Loader } from "../../components";
import loginBannerImage from "../../assets/images/login-page-image.svg";
import loginValidationSchema from "./validation";

interface ILoginForm {
    username: string;
    password: string;
}

const Login: React.FC = () => {
    const { login, loginLoading } = useAuth();

    const initialValues: ILoginForm = {
        username: "497",
        password: "admin@123",
    };

    const handleLogin = async (values: ILoginForm) => {
        login(values.username, values.password);
    };

    return (
        <>
            {loginLoading ? (
                <Loader className="full-screen-loader" />
            ) : (
                <StyledLoginWrap>
                    <div className="login-img-wrap">
                        <img src={loginBannerImage} alt="Login banner image" />
                    </div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={loginValidationSchema}
                        onSubmit={handleLogin}
                    >
                        <Form className="login-form">
                            <h1 className="text-center">
                                Hello! Welcome back.
                            </h1>
                            <h2 className="text-center">
                                Login to your account
                            </h2>
                            <div className="form-row">
                                <CustomInput
                                    label="User ID"
                                    name="username"
                                    id="username"
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <CustomInput
                                    label="Password"
                                    name="password"
                                    id="password"
                                    type="password"
                                    required
                                />
                            </div>
                            <div className="form-controls">
                                <Button
                                    className="primary submit-btn"
                                    type="submit"
                                >
                                    SUBMIT
                                </Button>
                            </div>
                        </Form>
                    </Formik>
                </StyledLoginWrap>
            )}
        </>
    );
};

export default Login;
