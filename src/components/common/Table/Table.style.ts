import styled from "styled-components";

const StyledTable = styled.table`
    width: 100%;
    border-spacing: 0;
    border-radius: 10px;
    border: 1px solid #000;
    font-size: 1.2em;
    overflow: hidden;

    & th,
    & td {
        padding: 10px 7px;
    }

    & th {
        background-color: #d5d5d5;
        text-align: left;

        & .emp-heading-wrap {
            display: flex;
            align-items: center;
            gap: 7px;
        }

        & .sort-btn {
            padding: 0;
            color: gray;

            &[data-sort-dir="desc"] {
                rotate: 180deg;
            }

            & img {
                height: 18px;
                width: auto;
                pointer-events: none;
            }

            &:hover img {
                scale: 1.2;
                font-variation-settings: "wght" 450;
            }
        }
    }

    & th,
    & tr:not(:last-child) td {
        border-bottom: 1px solid #000;
    }

    & .table-loader {
        margin: 20px auto;
    }
`;

export default StyledTable;
