import * as Yup from "yup";

const loginValidationSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, "Username must be at least 2 characters")
        .max(20, "Username cannot exceed 20 characters")
        .required("Username is required"),

    password: Yup.string().required("Password is required"),
});

export default loginValidationSchema;
