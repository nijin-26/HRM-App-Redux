import styled from "styled-components";

const StyledErrorPage = styled.section`
    background-color: #fff;
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
        font-size: 15em;
        color: var(--primary-clr);
        margin: 0;
    }

    p {
        font-size: 2em;
        font-weight: 300;
        margin: 0 0 50px;
    }

    .link-button {
        width: max-content;
        margin-inline: auto;
    }
`;

export default StyledErrorPage;
