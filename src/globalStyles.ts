import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *, 
    *:after,
    *:before {
        box-sizing: border-box;
    }

    :root {
        height: 100%;
        --max-width: 1440px;
        --primary-font: 'Roboto', sans-serif;
        --primary-clr: #007af5;
        --primary-clr-accent: #0066cc;
        --gray-clr: #bdbdbd;
        --edit-clr: #fcae1e;
        --edit-clr-accent: #ec9706;
        --toastify-color-success: green;
    }

    body {
        height: 100%;
        padding: 0;
        margin: 0;
        font-family: var(--primary-font);
    }

    #root {
        min-height: 100%;
        display: flex;
        flex-direction: column;
    }

    main {
        max-width: var(--max-width);
        width: 100%;
        margin-inline: auto;
        padding: 20px 10px;
        flex-grow: 1;
        position: relative;
    }

    .material-symbols-rounded {
    font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
    user-select: none;
    }

    .display-none {
        display: none;
    }

    .display-hidden {
        visibility: hidden;
    }

    .margin-right-auto {
        margin-right: auto;
    }

    .margin-left-auto {
        margin-left: auto;
    }

    .margin-inline-auto {
        margin-inline: auto;
    }

    .text-center {
        text-align: center;
    }

    .flex-container {
        display: flex;
    }

    .border-1 {
        border: 1px solid #000;
    }

    a {
        text-decoration: none;
    }

    .flex-grow {
        flex-grow: 1;
    }

    img {
        display: block;
    }

    label,
    input,
    textarea,
    select {
        display: block;
    }

    input,
    textarea,
    select {
        border: 1px solid #7e7e7e;
        border-radius: 3px;
        width: 100%;
        background-color: transparent;

        &:focus-visible {
            outline: 1px solid #000;
            border-color: #000;
        }
    }

    select {
        cursor: pointer;

        &:invalid {
            color: #7e7e7e;
        }

        & option {
            background-color: #fff;
        }
    }

    textarea {
        resize: none;
    }

    input[type='radio'] {
        accent-color: #000;
    }

    .flex {
        display: flex;

        &.direction {
        flex-direction: column;
        }

        &.justify-center {
            justify-content: center;
        }

        &.justify-bw {
            justify-content: space-between;
        }

        &.justify-start {
            justify-content: flex-start;
        }

        &.align-items-center {
            align-items: center;
        }

        &.align-items-start {
            align-items: start;
        }
    }

    
`;

export default GlobalStyle;
