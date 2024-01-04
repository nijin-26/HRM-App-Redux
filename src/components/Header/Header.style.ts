import styled from "styled-components";

const StyledHeader = styled.header`
    background-color: #fff;
    border-bottom: 1px solid var(--gray-clr);
    position: sticky;
    top: 0;
    z-index: 2;
`;

const Navbar = styled.nav`
    height: 64px;
    max-width: var(--max-width);
    width: 100%;
    padding-inline: 10px;
    margin-inline: auto;
    display: flex;
    gap: 10px;
    align-items: center;

    & .brand-logo {
        color: var(--primary-clr);
        margin: 0;
        font-size: 2em;
    }

    & .navlinks {
        list-style: none;
        padding: 0;
        display: flex;
        align-items: center;
        height: 100%;
        margin: 0 0 0 auto;

        & li {
            height: 100%;
            display: flex;
            align-items: center;
        }

        & a {
            font-size: 1em;
            font-weight: 500;
            color: #000;
            position: relative;
            transition: color 250ms ease;

            &:hover,
            &.active,
            &:focus-visible {
                color: var(--primary-clr);
            }

            &:focus-visible {
                outline-offset: 2px;
            }

            &::after {
                content: "";
                background-color: var(--primary-clr);
                position: absolute;
                left: 0;
                bottom: -3px;
                height: 2px;
                width: 100%;
                transform: scaleX(0);
                transition: transform 250ms ease;
                transform-origin: center;
            }

            &:hover::after,
            &.active::after {
                transform: scaleX(1);
            }
        }
    }
`;

export { StyledHeader, Navbar };
