import * as Yup from "yup";

const selectShape = Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.string().required(),
});

const validate = (isAddPage: boolean) => {
    const validateObj = {
        firstName: Yup.string()
            .trim()
            .required("First name is required")
            .min(2, "First name must be at least 2 characters")
            .max(50, "First name cannot exceed 50 characters"),
        email: Yup.string()
            .email("Invalid email")
            .matches(/@qburst\.com$/, "Email must end with @qburst.com")
            .required("Email is required"),
        dob: Yup.date()
            .max(new Date(), "Date of birth cannot be in the future")
            .required("Date of Birth is required"),
        phone: Yup.string()
            .required("Mobile number is required")
            .matches(/^[0-9]+$/, "Mobile number must only contain digits")
            .min(10, "Mobile number must be at least 10 digits")
            .max(10, "Mobile number must not exceed 10 digits"),
        gender: Yup.string().required("Gender is required"),
        address: Yup.string()
            .min(10, "Address must be at least 10 characters")
            .max(200, "Address cannot exceed 200 characters")
            .required("Address is required"),
        role: selectShape.required("Role is required"),
        department: selectShape.required("Department is required"),
        dateOfJoining: Yup.date()
            .max(new Date(), "Date of joining cannot be in the future")
            .required("Date of Joining is required"),
        location: selectShape.required("Location is required"),
        skills: Yup.array()
            .of(selectShape)
            .min(1, "Atleast one skill is required"),
    };
    if (!isAddPage) return Yup.object().shape(validateObj);
    else
        return Yup.object().shape({
            ...validateObj,
            password: Yup.string()
                .min(5, "Password must be at least 5 characters")
                .max(20, "Password cannot exceed 20 characters")
                .required("Password is required"),
        });
};
export default validate;
