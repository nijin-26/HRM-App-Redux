import { ToggleViewWrapper } from "./ToggleView.styles";

type TToggleViewProps = {
  gridView: boolean;
  handleToggleGridView: (state: boolean) => void;
};

const ToggleView = ({ gridView, handleToggleGridView }: TToggleViewProps) => {
  return (
    <ToggleViewWrapper>
      <div
        className={gridView ? "active" : ""}
        onClick={() => handleToggleGridView(true)}
      >
        <span className="material-symbols-rounded">grid_view</span>
        <p>Grid</p>
      </div>
      <div
        className={!gridView ? "active" : ""}
        onClick={() => handleToggleGridView(false)}
      >
        <span className="material-symbols-rounded">list</span>
        <p>List</p>
      </div>
    </ToggleViewWrapper>
  );
};

export default ToggleView;
