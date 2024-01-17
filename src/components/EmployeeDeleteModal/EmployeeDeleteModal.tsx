import StyledEmployeeDeleteModal from "./EmployeeDeleteModal.style";
import { Button } from "..";
import { useState } from "react";

interface IEmployeeDeleteModal {
    confirmClickHandler: () => void;
    cancelClickHandler: () => void;
    empEmailToDelete?: string;
}

const EmployeeDeleteModal: React.FC<IEmployeeDeleteModal> = ({
    confirmClickHandler,
    cancelClickHandler,
    empEmailToDelete,
}) => {
    const [email, setEmail] = useState("");

    const isEmailEqual = empEmailToDelete === email;

    return (
        <StyledEmployeeDeleteModal>
            <h2 className="confirm-dialog-heading">Delete Employee</h2>
            <p className="confirm-dialog-msg">
                To confirm the deletion of this employee, please enter their
                email <span>{empEmailToDelete}</span> in the field below.
            </p>
            <form
                action=""
                onSubmit={(e) => {
                    e.preventDefault();
                    confirmClickHandler();
                }}
            >
                <input
                    type="email"
                    value={email}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(event.target.value)
                    }
                />
                <div className="confirm-dialog-actions">
                    <Button
                        type="submit"
                        className="primary"
                        disabled={!isEmailEqual}
                    >
                        Delete
                    </Button>
                    <Button
                        className="outline"
                        onClick={() => {
                            setEmail("");
                            cancelClickHandler();
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </StyledEmployeeDeleteModal>
    );
};

export default EmployeeDeleteModal;
