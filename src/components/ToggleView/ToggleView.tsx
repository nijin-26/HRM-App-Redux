import { ToggleViewWrapper } from "./ToggleView.styles";

type TToggleViewProps = {
    gridView: boolean;
    handleToggleGridView: () => void;
};

const ToggleView = ({ gridView, handleToggleGridView }: TToggleViewProps) => {
    return (
        <ToggleViewWrapper>
            <div
                className={!gridView ? "active" : ""}
                onClick={handleToggleGridView}
            >
                <span className="material-symbols-rounded">list</span>
                <p>List View</p>
            </div>
            <div
                className={gridView ? "active" : ""}
                onClick={handleToggleGridView}
            >
                <span className="material-symbols-rounded">grid_view</span>
                <p>Grid View</p>
            </div>
        </ToggleViewWrapper>
    );
};

export default ToggleView;
