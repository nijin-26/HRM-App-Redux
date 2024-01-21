import { Overlay, StyledModal } from "./Modal.style";
import { Button } from "../..";

interface IModal {
    children: JSX.Element;
    cancelClickHandler?: () => void;
}

const Modal: React.FC<IModal> = ({ children, cancelClickHandler }) => {
    return (
        <>
            <Overlay />
            <StyledModal>
                <Button onClick={cancelClickHandler} className="cancel-btn">
                    <span className="material-symbols-rounded">
                        disabled_by_default
                    </span>
                </Button>
                {children}
            </StyledModal>
        </>
    );
};

export default Modal;
