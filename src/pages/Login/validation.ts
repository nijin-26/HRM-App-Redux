import * as Yup from 'yup';

const loginValidationSchema = Yup.object().shape({
    username: Yup.string()
        .min(5, 'Username must be at least 5 characters')
        .max(20, 'Username cannot exceed 20 characters')
        .required('Username is required'),

    password: Yup.string()
        .min(5, 'Password must be at least 5 characters')
        .max(20, 'Password cannot exceed 20 characters')
        .required('Password is required'),
});

export default loginValidationSchema;
