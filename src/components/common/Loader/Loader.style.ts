import styled from "styled-components";
import { keyframes } from "styled-components";

const Rotation = keyframes`
    0% {rotate: 0deg;}
    100% {rotate: 360deg;}
`;

const StyledLoader = styled.div`
    width: 48px;
    height: 48px;
    border: 5px solid #fff;
    border-bottom-color: var(--primary-clr);
    border-radius: 50%;
    animation: ${Rotation} 500ms linear infinite;
    margin-inline: auto;

    &.full-screen-loader {
        width: 80px;
        height: 80px;
        z-index: 25;
        position: fixed;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
    }
`;

export default StyledLoader;
