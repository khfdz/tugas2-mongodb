import React from 'react';

const TombolNavigasi = ({ onPreviousClick, onNextClick, hasPrevious, hasNext, currentPage, totalPages }) => {
    return (
        <div>
            {hasPrevious && <button className='btnPrevious' onClick={onPreviousClick}>Previous Page</button>}
            {hasNext && <button className='btnNext' onClick={onNextClick}>Next Page</button>}
            <p>Page {currentPage} of {totalPages}</p>
        </div>
    );
};

export default TombolNavigasi;
