import React, { useContext } from 'react';
import Pagination from './Pagination';
import MovieModal from './MovieModal';
import { getImageSrc } from '../utils';
import Modal from './Modal';
import { MoviesContext } from '../MoviesContext';

const MovieList = () => {
    const {
        movieList,
        currentPage,
        setCurrentPage,
        checkMovieInFavourites,
        addToFavourite,
        removeFromFavouriteById,
        currentMovieId,
        setCurrentMovieId
    } = useContext(MoviesContext);

    const onError = e => {
        e.currentTarget.src = '/images/movie-poster.jpg';
    };

    const currentMovie = movieList.find(movie => movie.id === currentMovieId);
    // const currentMovie = useMemo(() => {
    //     movieList.find(movie => movie.id === currentMovieId);
    // }, [currentMovieId]);

    const onMovieClick = movieId => {
        setCurrentMovieId(movieId);
    };

    const onNextMovieClick = () => {
        if (currentMovieId === movieList[movieList.length - 1].id) {
            setCurrentPage(currentPage + 1);
        } else {
            const nextMovieId = movieList.reduce((acc, movie, index) => {
                if (currentMovieId === movie.id) {
                    acc = movieList[index + 1].id;
                }
                return acc;
            }, null);
            setCurrentMovieId(nextMovieId);
        }
    };

    const onAddToFavourite = () => {
        addToFavourite(currentMovie);
    };

    const onRemoveFromFavourite = () => {
        removeFromFavouriteById(currentMovieId);
    };

    return <main className="main">
        <p className="main__title">Latest Releases</p>
        <div className="movie-list">
            {
                movieList.map(movie =>
                    <div className="movie-list__movie" key={movie.id}>
                        <img src={getImageSrc(movie.poster_path)}
                             onError={onError}
                             alt=""
                             className="movie-list__movie-image"
                             title={movie.title}
                             onClick={() => onMovieClick(movie.id)}
                        />
                    </div>
                )
            }
        </div>
        <Pagination className="main__pagination" />
        {
            currentMovie
                 && <Modal>
                     <MovieModal movie={currentMovie}
                                 onClose={() => setCurrentMovieId(null)}
                                 onNextMovie={onNextMovieClick}
                                 isMovieInFavourites={checkMovieInFavourites(currentMovieId)}
                                 addToFavourite={onAddToFavourite}
                                 removeFromFavourite={onRemoveFromFavourite}
                     />
                 </Modal>
        }
    </main>;
};

export default MovieList;
