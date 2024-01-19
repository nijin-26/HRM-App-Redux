import StyledOverlay from "./Overlay.style";

interface IOverlay {
    children: JSX.Element;
}

const Overlay: React.FC<IOverlay> = ({ children }) => {
    return <StyledOverlay>{children}</StyledOverlay>;
};

export default Overlay;
