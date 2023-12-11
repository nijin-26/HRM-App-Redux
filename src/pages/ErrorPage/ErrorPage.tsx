import { LinkButton } from '../../components';
import StyledErrorPage from './ErrorPage.style';

const ErrorPage: React.FC = () => {
    return (
        <StyledErrorPage>
            <h1>404</h1>
            <p>Page not found.</p>
            <LinkButton to="/employees" className="link-button primary">
                Go to Home Page
            </LinkButton>
        </StyledErrorPage>
    );
};

export default ErrorPage;
