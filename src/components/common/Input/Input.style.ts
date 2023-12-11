import styled from 'styled-components';

const StyledInput = styled.input`
    &:focus-visible {
        outline: 1px solid #000;
        border-color: #000;
    }

    border: 1px solid #7e7e7e;
    border-radius: 3px;
    padding: 5px 5px;
    font-size: 1em;
    width: 250px;
    background-color: transparent;

    &.w-full {
        display: block;
        width: 100%;
    }
`;

export default StyledInput;
