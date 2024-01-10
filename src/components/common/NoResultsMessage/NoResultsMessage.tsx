import StyledNoResultsMessage from "./NoResultsMessage.style";
import noDataImage from "../../../assets/images/no-data.png";

const NoResultsMessage: React.FC = () => {
    return (
        <StyledNoResultsMessage>
            <img
                src={noDataImage}
                alt="no-data-image"
                className="no-data-img"
            />
            <h2>No Results Found</h2>
            <p>It seems we can't find any results based on your search.</p>
        </StyledNoResultsMessage>
    );
};

export default NoResultsMessage;
