import React, { useEffect, useState, useCallback } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    const getData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=5c8044317a39ce0ecbab4bdd7d2e26fc&language=en-US`);
            if (!response.ok) {
                throw new Error('Failed to fetch movie details');
            }
            const data = await response.json();
            setMovie(data);
            console.log('Before update:', JSON.parse(localStorage.getItem('recentMovies')));


            // Update recent movies in local storage
            let recentMovies = JSON.parse(localStorage.getItem('recentMovies')) || [];
            if (!recentMovies.find(movie => movie.id === id)) {
                recentMovies = [{ id }, ...recentMovies].slice(0, 55); // Keep only the latest 55 movies
                localStorage.setItem('recentMovies', JSON.stringify(recentMovies));
            }
            console.log('After update:', JSON.parse(localStorage.getItem('recentMovies')));

        } catch (error) {
            console.error('Error fetching movie details:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        getData();
        window.scrollTo(0, 0);
    }, [getData]);

    if (loading) {
        return (
            <div className="movie">
                <Skeleton height={500} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="movie">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="movie">
            <div className="movie__intro">
                <img
                    className="movie__backdrop"
                    src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`}
                    alt={currentMovieDetail?.original_title}
                />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img
                            className="movie__poster"
                            src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`}
                            alt={currentMovieDetail?.original_title}
                        />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.vote_average : ""} <i className="fas fa-star" />
                            <span className="movie__voteCount">{currentMovieDetail ? `(${currentMovieDetail.vote_count}) votes` : ""}</span>
                        </div>
                        <div className="movie__runtime">{currentMovieDetail ? `${currentMovieDetail.runtime} mins` : ""}</div>
                        <div className="movie__releaseDate">{currentMovieDetail ? `Release date: ${currentMovieDetail.release_date}` : ""}</div>
                        <div className="movie__genres">
                            {currentMovieDetail && currentMovieDetail.genres ?
                                currentMovieDetail.genres.map(genre => (
                                    <span key={genre.id} className="movie__genre">{genre.name}</span>
                                ))
                                : ""}
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                    <div className="movie__links">
                        {currentMovieDetail && currentMovieDetail.homepage &&
                            <a href={currentMovieDetail.homepage} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", marginRight: '2%' }}>
                                <p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p>
                            </a>
                        }
                        {currentMovieDetail && currentMovieDetail.imdb_id &&
                            <a href={`https://www.imdb.com/title/${currentMovieDetail.imdb_id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                                <p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p>
                            </a>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Movie;
