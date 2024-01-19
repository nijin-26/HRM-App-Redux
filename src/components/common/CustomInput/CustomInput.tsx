import { useField, Field } from "formik";

interface ICustomInput extends React.HTMLProps<HTMLInputElement> {
    label: string;
    name: string;
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
                className={
                    (disabled ? "disabled" : "") ||
                    (required ? "required-field" : "")
                }
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
