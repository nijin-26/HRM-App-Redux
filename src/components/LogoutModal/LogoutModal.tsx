import { Button } from "..";
import StyledLogoutModal from "./LogoutModal.style";

interface ILogoutModal {
    confirmClickHandler: () => void;
    cancelClickHandler: () => void;
}

const LogoutModal: React.FC<ILogoutModal> = ({
    confirmClickHandler,
    cancelClickHandler,
}) => {
    return (
        <StyledLogoutModal>
            <h2 className="confirm-dialog-heading">Logout</h2>
            <p className="confirm-dialog-msg">
                Are you sure you want to Logout?
            </p>
            <form
                action=""
                onSubmit={(e) => {
                    e.preventDefault();
                    confirmClickHandler();
                }}
            >
                <div className="confirm-dialog-actions">
                    <Button type="submit" className="primary">
                        Logout
                    </Button>
                    <Button
                        className="outline"
                        onClick={() => {
                            cancelClickHandler();
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </StyledLogoutModal>
    );
};

export default LogoutModal;
