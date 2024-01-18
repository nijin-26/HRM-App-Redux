import styled from "styled-components";

export const CardContainer = styled.div`
    height: 320px;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 0px 10px #ccc;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition: all 0.5s;

    &:hover {
        scale: 1.02;
        box-shadow: 0px 10px 10px #ccc;
    }
`;

export const CardHeader = styled.div`
    min-height: 80px;
    background-color: var(--primary-clr);
    padding: 16px;
    position: relative;
    display: flex;

    img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, 0);
        width: 82px;
        height: 82px;
        border-radius: 50%;
        object-fit: cover;
        background-color: #fff;
        box-shadow: 0px 0px 10px #ccc;
    }

    .employee-id {
        color: #fff;
        font-weight: bold;
    }

    .employee-actions {
        list-style: none;
        display: flex;
        align-items: center;
        gap: 25px;
        padding-left: 0;
        margin: 0 0 0 auto;

        li button,
        li a {
            padding: 0;
            align-items: center;
        }

        li span {
            color: #fff;
            font-size: 26px;

            &:hover {
                scale: 1.2;
                font-variation-settings: "FILL" 1;
            }
        }
    }
`;

export const CardBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 48px;
    text-align: center;

    & * {
        margin: 0;
    }

    h3 {
        text-transform: uppercase;
    }

    .role {
        color: gray;
        margin-bottom: 8px;
    }

    .card_header {
        margin-top: 10px;
    }

    .details_wrapper {
        padding: 0 16px;
        margin: 10px 0;
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 12px;
    }

    .details_wrapper > div {
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: center;
        word-wrap: normal;
        color: #000;
    }

    a {
        color: #000;
        line-break: anywhere;
    }

    a:hover {
        text-decoration: underline;
    }

    .divider {
        width: 100%;
        border: 1px solid #ccc;
    }
`;
