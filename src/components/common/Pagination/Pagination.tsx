import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../..';
import PaginationContainer from './Pagination.style';

interface IPagination {
    totalEntries: number;
}

const Pagination: React.FC<IPagination> = ({ totalEntries = 0 }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const offset = Number(searchParams.get('offset')) || 0;
    const limit = Number(searchParams.get('limit')) || 10;

    const [currentPage, setCurrentPage] = useState<number>(
        Math.ceil(offset / limit) + 1
    );

    const isFirstPage = offset === 0;
    const isLastPage = offset + limit >= totalEntries;

    const updateQueryParams = (newOffset: number) => {
        const newPageNumber = Math.floor(newOffset / limit) + 1;
        setCurrentPage(newPageNumber);

        searchParams.set('offset', String(newOffset));
        searchParams.set('limit', String(limit));
        setSearchParams(searchParams);
    };

    const handlePageChange = (newPage: number) => {
        const newOffset = (newPage - 1) * limit;
        updateQueryParams(newOffset);
    };

    const handleInputPageChange = () => {
        let newPageNumber = currentPage;

        // Check if new page number is valid
        newPageNumber = Math.max(
            1,
            Math.min(newPageNumber, Math.ceil(totalEntries / limit))
        );

        handlePageChange(newPageNumber);
    };

    return (
        <PaginationContainer>
            <div className="page-controls">
                <Button
                    className="icon-btn primary"
                    disabled={isFirstPage}
                    onClick={() => handlePageChange(1)}
                >
                    <span className="material-symbols-rounded">first_page</span>
                </Button>
                <Button
                    className="icon-btn primary"
                    disabled={isFirstPage}
                    onClick={() =>
                        handlePageChange(Math.max(currentPage - 1, 1))
                    }
                >
                    <span className="material-symbols-rounded">
                        navigate_before
                    </span>
                </Button>
                <div className="current-page-input-wrap">
                    <input
                        type="text"
                        className="current-page-input"
                        value={String(currentPage)}
                        onChange={(e) => {
                            const inputText = e.target.value;
                            if (
                                /^[0-9]\d*$/.test(inputText) ||
                                inputText === ''
                            ) {
                                setCurrentPage(Number(inputText));
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleInputPageChange();
                            }
                        }}
                    />
                    <Button className="outline" onClick={handleInputPageChange}>
                        GO
                    </Button>
                </div>
                <Button
                    className="icon-btn primary"
                    disabled={isLastPage}
                    onClick={() =>
                        handlePageChange(
                            Math.min(
                                currentPage + 1,
                                Math.ceil(totalEntries / limit)
                            )
                        )
                    }
                >
                    <span className="material-symbols-rounded">
                        navigate_next
                    </span>
                </Button>
                <Button
                    className="icon-btn primary"
                    disabled={isLastPage}
                    onClick={() =>
                        handlePageChange(Math.ceil(totalEntries / limit))
                    }
                >
                    <span className="material-symbols-rounded">last_page</span>
                </Button>
            </div>
            <span>
                {offset + 1}-{Math.min(offset + limit, totalEntries)} of{' '}
                {totalEntries} items
            </span>
        </PaginationContainer>
    );
};

export default Pagination;

// import { useSearchParams } from 'react-router-dom';
// import { useState } from 'react';
// import { Button } from '../..';
// import PaginationContainer from './Pagination.style';

// interface IPagination {
//     totalEntries: number;
// }

// const Pagination: React.FC<IPagination> = ({ totalEntries = 0 }) => {
//     const [searchParams, setSearchParams] = useSearchParams();

//     const offset = Number(searchParams.get('offset') ?? 0);
//     const limit = Number(searchParams.get('limit') ?? 10);

//     const [currentPage, setCurrentPage] = useState<String>(
//         String(Math.ceil(offset / limit) + 1)
//     );

//     const isFirstPage = offset === 0;
//     const isLastPage = offset + limit >= totalEntries;

//     const updateQueryParams = (newOffset: number) => {
//         const newPageNumber = Math.floor(newOffset / limit) + 1;
//         setCurrentPage(String(newPageNumber));

//         searchParams.set('offset', String(newOffset));
//         searchParams.set('limit', String(limit));
//         setSearchParams(searchParams);
//     };

//     const pageInputButtonClickHandler = () => {
//         let newOffset = currentPage ? (Number(currentPage) - 1) * limit : 1;

//         if (Number(newOffset) > totalEntries) {
//             newOffset = Math.floor(totalEntries / limit) * limit;
//         }
//         updateQueryParams(newOffset);
//     };

//     return (
//         <PaginationContainer>
//             <div className="page-controls">
//                 <Button
//                     className="icon-btn primary"
//                     disabled={isFirstPage}
//                     onClick={() => updateQueryParams(0)}
//                 >
//                     <span className="material-symbols-rounded">first_page</span>
//                 </Button>
//                 <Button
//                     className="icon-btn primary"
//                     disabled={isFirstPage}
//                     onClick={() => {
//                         updateQueryParams(Math.max(offset - limit, 0));
//                     }}
//                 >
//                     <span className="material-symbols-rounded">
//                         navigate_before
//                     </span>
//                 </Button>
//                 <div className="current-page-input-wrap">
//                     <input
//                         type="text"
//                         className="current-page-input"
//                         value={String(currentPage)}
//                         onChange={(e) => {
//                             const inputText = e.target.value;
//                             if (
//                                 /^[1-9]\d*$/.test(inputText) ||
//                                 inputText === ''
//                             ) {
//                                 setCurrentPage(inputText);
//                             }
//                         }}
//                         onKeyDown={(e) => {
//                             if (e.key === 'Enter') {
//                                 pageInputButtonClickHandler();
//                             }
//                         }}
//                     />
//                     <Button
//                         className="outline"
//                         onClick={pageInputButtonClickHandler}
//                     >
//                         GO
//                     </Button>
//                 </div>

//                 <Button
//                     className="icon-btn primary"
//                     disabled={isLastPage}
//                     onClick={() => {
//                         updateQueryParams(
//                             Math.min(offset + limit, totalEntries)
//                         );
//                     }}
//                 >
//                     <span className="material-symbols-rounded">
//                         navigate_next
//                     </span>
//                 </Button>
//                 <Button
//                     className="icon-btn primary"
//                     disabled={isLastPage}
//                     onClick={() => {
//                         updateQueryParams(
//                             Math.floor(totalEntries / limit) * limit
//                         );
//                     }}
//                 >
//                     <span className="material-symbols-rounded">last_page</span>
//                 </Button>
//             </div>
//             <span>
//                 {offset + 1}-{Math.min(offset + limit, totalEntries)} of{' '}
//                 {totalEntries} items
//             </span>
//         </PaginationContainer>
//     );
// };

// export default Pagination;
