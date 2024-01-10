import styled from "styled-components";

const StyledLogoutModal = styled.div`
    min-width: 450px;

    .confirm-dialog-heading {
        font-size: 1.5em;
        margin: 15px 0;
    }

    .confirm-dialog-msg {
        font-size: 1.2em;
    }

    .confirm-dialog-actions {
        display: flex;
        gap: 10px;
        justify-content: right;
    }
`;

export default StyledLogoutModal;
