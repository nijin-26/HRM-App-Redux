// A react-router Link component styled as a button
import StyledLinkButton from './LinkButton.style';
import { LinkProps } from 'react-router-dom';

const LinkButton: React.FC<
    LinkProps & React.RefAttributes<HTMLAnchorElement>
> = ({ children, ...props }) => {
    return <StyledLinkButton {...props}>{children}</StyledLinkButton>;
};

export default LinkButton;
