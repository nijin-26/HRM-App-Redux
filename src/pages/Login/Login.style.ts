import styled from "styled-components";

const StyledLoginWrap = styled.section`
    display: grid;
    grid-auto-columns: minmax(0, 1fr);
    grid-auto-flow: column;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 5px;
    overflow: hidden;

    & > * {
        padding: 40px;
    }

    .login-img-wrap {
        background-color: var(--primary-clr);
        display: flex;
        align-items: center;

        img {
            height: auto;
            width: 100%;
        }
    }

    .login-form {
        display: flex;
        flex-direction: column;
        justify-content: center;

        h1 {
            margin: 0 0 0.5em;
        }

        h2 {
            font-weight: 500;
            margin: 0 0 1.7em;
        }

        .form-row {
            margin-bottom: 20px;
        }

        label {
            margin-bottom: 5px;
        }

        input {
            font-size: 1.2em;
            padding: 5px 3px;
        }

        input.invalid {
            background-color: #f8d7da;
        }

        .error-msg {
            color: #b70000;
            margin: 5px 0 0 0;
            font-size: 0.8em;
        }

        .form-controls {
            margin-top: 10px;
            display: flex;
            justify-content: center;
        }

        .submit-btn {
            flex-grow: 1;
            justify-content: center;
        }
    }

    @media only screen and (max-width: 700px) {
        .login-img-wrap {
            display: none;
        }

        h1 {
            font-size: 1.6em;
        }
    }
`;

export default StyledLoginWrap;
