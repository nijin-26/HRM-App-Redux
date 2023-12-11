import styled from 'styled-components';

const PaginationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    .page-controls {
        display: flex;
        margin-inline: auto;
        gap: 15px;
        height: 30px;
    }

    .current-page-input-wrap {
        display: flex;
        gap: 5px;

        .current-page-input {
            text-align: center;
            font-size: 1.2em;
            min-width: 0;
            max-width: 80px;
        }
    }
`;

export default PaginationContainer;
