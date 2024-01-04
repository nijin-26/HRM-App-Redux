import styled from "styled-components";

const StyledFooter = styled.footer`
    text-align: center;
    padding: 15px 10px;
    border-top: 1px solid var(--gray-clr);

    & .copyright-text {
        font-size: 0.8em;
    }
`;

const Footer: React.FC = () => {
    return (
        <StyledFooter>
            <span className="copyright-text">
                Copyright &#169; 2023 HRM-app.com
            </span>
        </StyledFooter>
    );
};

export default Footer;
