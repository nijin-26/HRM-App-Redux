import useAuth from '../../hooks/useAuth';
import { Button, CustomInput } from '../../components';
import StyledLoginWrap from './Login.style';
import { Form, Formik } from 'formik';

interface ILoginForm {
    username: string;
    password: string;
}

const Login: React.FC = () => {
    const { login } = useAuth();

    const initialValues: ILoginForm = {
        username: 'abhib',
        password: 'abhib',
    };

    const handleLogin = async (values: ILoginForm) => {
        login(values.username, values.password);
    };

    return (
        <StyledLoginWrap>
            <Formik initialValues={initialValues} onSubmit={handleLogin}>
                <Form>
                    <h2 className="text-center">Login to your account</h2>
                    <div className="form-row">
                        <CustomInput
                            label="Email"
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
                        <Button className="primary" type="submit">
                            SUBMIT
                        </Button>
                    </div>
                </Form>
            </Formik>
        </StyledLoginWrap>
    );
};

export default Login;
