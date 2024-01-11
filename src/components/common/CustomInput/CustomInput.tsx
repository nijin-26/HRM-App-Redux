import { useField, Field } from "formik";

interface ICustomInput {
    label: string;
    name: string;
    id?: string;
    type: string;
    placeholder?: string;
    className?: string;
    required?: boolean;
    disabled?: boolean;
}

const CustomInput: React.FC<ICustomInput> = ({
    label,
    required,
    disabled = false,
    ...props
}) => {
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
                disabled={disabled}
                className={
                    (disabled ? "disabled" : "") ||
                    (meta.touched && meta.error ? "invalid" : "")
                }
            />
            {meta.touched && meta.error ? (
                <div className="error-msg">{meta.error}</div>
            ) : null}
        </>
    );
};

export default CustomInput;
