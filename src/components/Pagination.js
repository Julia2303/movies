import React, { useContext, useMemo } from 'react';
import { MoviesContext } from '../MoviesContext';

const Pagination = props => {
    const { className } = props;
    const { currentPage, paginate, totalPages } = useContext(MoviesContext);

    const removeButton = page => {
        if(currentPage >= page) {
            return ' pagination__button--removed';
        } else {
            return '';
        }
    };

    const paginationRange = useMemo(() => {
        if (currentPage === totalPages || currentPage === totalPages - 1) {
            return [totalPages - 1, totalPages];
        }
        return [currentPage, currentPage + 1, currentPage + 2];
    }, [currentPage, totalPages]);

    const onNext = () => {
        paginate(currentPage + 1);
    };

    const onPrevious = () => {
        paginate(currentPage - 1);
    };

    const onFirst = () => {
        paginate(1);
    };

    const onLast = () => {
        paginate(totalPages);
    };

    return <div className={`pagination ${className}`}>

        <button onClick={onFirst} className="pagination__button">First</button>
        <button onClick={onPrevious}
                className={`pagination__button${currentPage === 1 ? ' pagination__button--disabled' : ''}`}
        >
            Prev
        </button>

        {
            paginationRange.map(number =>
                <button onClick={() => paginate(number)} key={number}
                        className={`pagination__button${currentPage === number ? ' pagination__button--active' : ''}`}
                >
                    <span>{number}</span>
                </button>
            )
        }

        <button className={`pagination__button${removeButton(totalPages - 2)}`}>...</button>
        <button onClick={onNext} className={`pagination__button${removeButton(totalPages)}`}>Next</button>
        <button onClick={onLast} className={`pagination__button${removeButton(totalPages)}`}>Last</button>
    </div>;
};

export default Pagination;
