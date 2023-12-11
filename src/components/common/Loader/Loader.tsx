import StyledLoader from './Loader.style';

interface ILoader {
    className?: string;
}

const Loader: React.FC<ILoader> = ({ ...props }) => {
    return <StyledLoader {...props} />;
};

export default Loader;
