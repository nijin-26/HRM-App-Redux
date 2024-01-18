import StyledChip from "./Chip.style";
import { Button } from "../..";

interface IChip {
    children: React.ReactNode;
    isDeletable?: boolean;
}

const Chip: React.FC<IChip> = ({ children, isDeletable }) => {
    return (
        <StyledChip>
            {children}
            {isDeletable && (
                <Button className="skill-remove-btn">
                    <span className="material-symbols-rounded icon">
                        cancel
                    </span>
                </Button>
            )}
        </StyledChip>
    );
};

export default Chip;
