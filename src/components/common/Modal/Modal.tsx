import { Overlay, StyledModal } from './Modal.style';
import { Button } from '../..';

interface IModal {
    $isOpen: boolean;
    text: string;
    type: 'ok' | 'yesCancel';
    confirmClickHandler: () => void;
    cancelClickHandler?: () => void;
}

const Modal: React.FC<IModal> = ({
    text,
    type,
    $isOpen = false,
    confirmClickHandler,
    cancelClickHandler,
}) => {
    return (
        <>
            <Overlay $isOpen={$isOpen} />
            <StyledModal $isOpen={$isOpen}>
                <p className="confirm-dialog-msg">{text}</p>
                <div className="flex-container confirm-dialog-actions">
                    {type === 'ok' && (
                        <Button
                            className="primary confirm-yes-btn"
                            onClick={confirmClickHandler}
                        >
                            Ok
                        </Button>
                    )}
                    {type === 'yesCancel' && (
                        <>
                            <Button
                                className="outline confirm-yes-btn"
                                onClick={confirmClickHandler}
                            >
                                Yes
                            </Button>
                            <Button
                                className="primary confirm-no-btn"
                                onClick={cancelClickHandler}
                            >
                                Cancel
                            </Button>
                        </>
                    )}
                </div>
            </StyledModal>
        </>
    );
};

export default Modal;
