import styled from 'styled-components';

interface IModal {
    $isOpen: boolean;
}

const Overlay = styled.div<IModal>`
    position: fixed;
    display: none;
    inset: 0 0 0 0;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(2.5px);

    ${({ $isOpen }) =>
        $isOpen &&
        `
            display: block;
    `}
`;

const StyledModal = styled.div<IModal>`
    display: none;
    position: fixed;
    max-height: 95vh;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    overflow: hidden auto;
    min-width: 250px;
    border: 1px solid black;
    z-index: 4;
    background-color: #fff;
    border: none;
    border-radius: 5px;
    padding: 25px 20px;

    ${({ $isOpen }) =>
        $isOpen &&
        `
            display: block;
    `}

    & .confirm-dialog-msg {
        margin: 0;
        margin-bottom: 20px;
    }

    & .confirm-dialog-actions {
        gap: 10px;
        justify-content: right;
    }
`;

export { Overlay, StyledModal };
