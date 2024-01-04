import StyledInput from "./Input.style";

interface IInput {
    placeholder?: string;
    className?: string;
    type?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<IInput> = ({ type = "text", ...props }) => {
    return <StyledInput type={type} {...props} />;
};

export default Input;
