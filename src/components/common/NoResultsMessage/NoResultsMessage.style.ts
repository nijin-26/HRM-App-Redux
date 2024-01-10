import styled from "styled-components";

const StyledNoResultsMessage = styled.div`
    text-align: center;

    .no-data-img {
        width: 400px;
        height: auto;
        display: block;
        margin-inline: auto;
    }

    h2 {
        font-size: 1.2em;
    }

    p {
        width: 100%;
        color: gray;
    }
`;

export default StyledNoResultsMessage;
