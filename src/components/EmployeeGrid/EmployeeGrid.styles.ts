import styled from "styled-components";

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    justify-content: center;
    align-items: center;
`;

export const NoDataContainer = styled.div`
    margin-top: 30px;
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
