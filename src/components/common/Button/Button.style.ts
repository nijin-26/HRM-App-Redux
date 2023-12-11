import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: transparent;
    cursor: pointer;
    border: none;
    padding: 7px 15px;
    border-radius: 5px;
    font-weight: bold;
    font-size: 1em;
    display: flex;
    align-items: center;

    &.primary {
        background-color: var(--primary-clr);
        color: #fff;

        &:hover {
            background-color: var(--primary-clr-accent);
        }
    }

    &.outline {
        background-color: #fff;
        border: 1px solid var(--primary-clr);
        color: var(--primary-clr);

        &:hover {
            background-color: var(--primary-clr);
            color: #fff;
        }
    }

    &.icon-btn {
        gap: 7px;

        & span {
            width: max-content;
        }

        & .icon {
            color: inherit;
        }
    }

    &:disabled {
        background-color: gray;
        pointer-events: none;
    }
`;

export default StyledButton;
