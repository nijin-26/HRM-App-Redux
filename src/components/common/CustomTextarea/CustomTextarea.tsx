import { Field, useField } from 'formik';

interface ITextarea {
    label: string;
    name: string;
    id?: string;
    placeholder?: string;
    className?: string;
    rows?: string;
    required?: boolean;
}

const CustomTextarea: React.FC<ITextarea> = ({ label, required, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label
                htmlFor={props.id || props.name}
                className={required ? 'required-field' : ''}
            >
                {label}
            </label>
            <Field
                as="textarea"
                {...field}
                {...props}
                className={meta.touched && meta.error ? 'invalid' : ''}
            />
            {meta.touched && meta.error ? (
                <div className="error-msg">{meta.error}</div>
            ) : null}
        </>
    );
};

export default CustomTextarea;
