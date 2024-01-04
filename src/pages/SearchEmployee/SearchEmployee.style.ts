import styled from "styled-components";

const FormContainer = styled.section`
    position: absolute;
    width: 60%;
    margin-inline: auto;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    display: flex;
    gap: 45px;
    flex-direction: column;
    align-items: center;

    form {
        width: 100%;
        padding: 20px 20px 30px;
        border-radius: 5px;
        box-shadow: 0 0 20px 10px rgb(176, 176, 176);

        h3 {
            padding: 0;
            font-size: 2.5em;
            font-weight: 500;
            text-align: center;
            margin: 0 0 15px 0;
        }

        .form-wrap {
            display: flex;
            align-items: flex-start;
            gap: 10px;
        }

        .form-entry {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            gap: 5px;
        }

        input[type="search"] {
            font-size: 1.3em;
            padding-inline: 7px;
            outline-offset: 0;
        }

        button,
        input[type="search"] {
            height: 40px;
        }

        .error-msg {
            color: #b70000;
            margin: 1px 0 0 0;
            font-size: 1em;
        }
    }
`;

export default FormContainer;
