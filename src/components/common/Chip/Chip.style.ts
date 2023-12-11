import styled from 'styled-components';

const StyledChip = styled.div`
    min-height: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    padding-inline: 8px;
    border-radius: 5px;
    border: 1px solid var(--primary-clr);
    color: var(--primary-clr);
    font-size: 0.8em;

    & .skill-remove-btn {
        padding: 0;
    }

    & .icon {
        font-size: 1.2em;
        color: var(--primary-clr);

        &:hover {
            font-variation-settings: 'FILL' 1;
        }
    }
`;

export default StyledChip;
