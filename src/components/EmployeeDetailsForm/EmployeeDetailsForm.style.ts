import styled from "styled-components";

const StyledFormWrap = styled.div`
    min-width: 1000px;
    padding: 40px;
    margin: 20px auto;
    width: 700px;
    box-shadow: 0 6px 20px -5px rgba(0, 0, 0);
    border-radius: 5px;

    --input-field-height: 2em;

    & h3 {
        font-weight: normal;
        margin: 0;
    }

    & label,
    & .radio-group-label {
        font-size: 1em;
        font-weight: 500;
        position: relative;
        display: inline-block;
        margin-bottom: 3px;
    }

    & input,
    & .radio-group-container {
        font-size: 1em;
        height: var(--input-field-height);
    }

    .radio-group-container {
        & label {
            font-weight: normal;
            margin-bottom: 0;
        }
    }

    & input,
    & select,
    & textarea {
        font-size: 1em;
        padding-inline: 7px;
        font-family: inherit;
    }

    & .form-row {
        justify-content: space-between;
        gap: 20px;
    }

    & .form-row > .form-entry {
        flex: 1 1 0;
    }

    & .required-field::after {
        content: "*";
        color: #b70000;
        position: absolute;
        top: 0;
        right: -10px;
    }

    & .form-entry {
        margin-bottom: 12px;

        &.checkbox {
            display: flex;
            justify-content: start;
            align-items: center;
            gap: 10px;

            label {
                margin: 0;
                width: 100%;
                flex: 1;
            }
            input {
                width: 20px;
            }
        }
    }

    & .error-msg {
        color: #b70000;
        margin: 5px 0 0 0;
        font-size: 0.8em;
    }

    .profile-picture-wrap {
        height: 150px;
        width: 150px;
        cursor: pointer;
        margin: 0 auto 40px;
        border-radius: 50%;
        overflow: clip;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px,
            rgba(0, 0, 0, 0.23) 0px 3px 6px;
        transition: scale 200ms ease;

        & > img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }

        &:hover,
        &:focus {
            scale: 1.1;
        }

        &:focus-visible {
            outline-color: var(--primary-clr);
            outline-offset: 2px;
        }
    }

    & input.invalid,
    & textarea.invalid {
        background-color: #f8d7da;
    }

    & .skills-input-container {
        & input {
            height: auto;
        }
    }

    & .form-controls-container {
        justify-content: end;
        gap: 20px;
        margin: 10px 0 0 0;
    }
`;

export default StyledFormWrap;
