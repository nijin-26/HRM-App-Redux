import FormContainer from "./SearchEmployee.style";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Button, LinkButton } from "../../components";

const SearchEmployee = () => {
    const navigate = useNavigate();
    return (
        <FormContainer>
            <Formik
                initialValues={{ employeeId: "" }}
                validateOnBlur={false}
                validationSchema={Yup.object().shape({
                    employeeId: Yup.number()
                        .typeError("Employee Id must be a number")
                        .positive("Employee Id must be greater than zero")
                        .required("Please enter an employee Id"),
                })}
                onSubmit={(values) => {
                    navigate(`/view-employee/${values.employeeId}`);
                }}
            >
                {(props) => {
                    return (
                        <form
                            autoComplete="off"
                            onSubmit={props.handleSubmit}
                            noValidate
                        >
                            <h3>Search for an Employee</h3>
                            <div className="form-wrap">
                                <div className="form-entry">
                                    <Field
                                        type="search"
                                        name="employeeId"
                                        placeholder="Employee Id"
                                    />
                                    <ErrorMessage
                                        name="employeeId"
                                        className="error-msg"
                                        component="div"
                                    />
                                </div>
                                <Button
                                    className="primary icon-btn"
                                    type="submit"
                                >
                                    <span>SEARCH</span>
                                    <span className="material-symbols-rounded">
                                        person_search
                                    </span>
                                </Button>
                            </div>
                        </form>
                    );
                }}
            </Formik>
            <LinkButton to="/employees" className="primary">
                Go to Home Page
            </LinkButton>
        </FormContainer>
    );
};

export default SearchEmployee;
