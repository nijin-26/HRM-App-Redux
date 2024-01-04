import styled from "styled-components";

const StyledRadioGrup = styled.div`
    & .radio-group-label {
        margin-bottom: 3px;
    }

    & .radio-group-container {
        display: flex;
        gap: 15px;
        align-items: center;

        & label {
            display: flex;
            align-items: center;
            gap: 5px;
            cursor: pointer;
        }

        & input {
            cursor: pointer;
        }
    }
`;

export default StyledRadioGrup;
