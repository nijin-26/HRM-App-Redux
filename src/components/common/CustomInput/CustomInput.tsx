import { useField, Field } from "formik";

interface ICustomInput {
    label: string;
    name: string;
    id?: string;
    type: string;
    placeholder?: string;
    className?: string;
    required?: boolean;
}

const CustomInput: React.FC<ICustomInput> = ({ label, required, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label
                htmlFor={props.id || props.name}
                className={required ? "required-field" : ""}
            >
                {label}
            </label>
            <Field
                {...field}
                {...props}
                className={meta.touched && meta.error ? "invalid" : ""}
            />
            {meta.touched && meta.error ? (
                <div className="error-msg">{meta.error}</div>
            ) : null}
        </>
    );
};

export default CustomInput;
