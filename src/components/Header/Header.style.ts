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
        gap: 20px;

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

    .navbar-actions {
        display: flex;
        gap: 10px;
    }

    .user-card {
        height: 50px;
        padding-inline: 12px;
        display: flex;
        gap: 10px;
        align-items: center;
        border: 1px solid var(--primary-clr);
        border-radius: 8px;
        color: var(--primary-clr);
        transition: all 0.3s ease-in-out;
        cursor: pointer;

        &:hover {
            scale: 1.02;
        }

        & > .user-card-image {
            width: 38px;
            height: 38px;
            /* border: 1px solid var(--primary-clr); */
            border-radius: 50%;
        }

        .user-card-body {
            display: flex;
            flex-direction: column;
        }

        .logout-btn {
            font-size: 28px;
            color: var(--primary-clr);
            cursor: pointer;
            transition: all 0.3 ease-in-out;
        }

        .logout-btn:hover {
            scale: 1.03;
            color: #000;
        }
    }
`;

export { StyledHeader, Navbar };
