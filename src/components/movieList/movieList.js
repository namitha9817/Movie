import React, { useEffect, useState, useCallback } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/card";

const MovieList = ({ recentMovies }) => {
    const [movieList, setMovieList] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [sortBy, setSortBy] = useState('popularity');
    const [genre, setGenre] = useState('All');
    const { type } = useParams();

    const getData = useCallback(async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${type || "popular"}?api_key=5c8044317a39ce0ecbab4bdd7d2e26fc&language=en-US`);
            const data = await response.json();
            setMovieList(data.results);
            setFilteredMovies(data.results);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }, [type]);

    useEffect(() => {
        if (recentMovies) {
            setMovieList(recentMovies);
            setFilteredMovies(recentMovies);
        } else {
            getData();
        }
    }, [getData, recentMovies]);

    useEffect(() => {
        let updatedMovies = [...movieList];

        if (genre !== 'All') {
            updatedMovies = updatedMovies.filter(movie => movie.genre_ids.includes(parseInt(genre)));
        }

        if (sortBy === 'rating') {
            updatedMovies.sort((a, b) => b.vote_average - a.vote_average);
        } else {
            updatedMovies.sort((a, b) => b.popularity - a.popularity);
        }

        setFilteredMovies(updatedMovies);

        if (!recentMovies && updatedMovies.length < 5) {
            getData();
        }
    }, [sortBy, genre, movieList, getData, recentMovies]);

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleGenreChange = (e) => {
        setGenre(e.target.value);
    };

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type || "POPULAR").toUpperCase()}</h2>

            {!recentMovies && (
                <div className="controls">
                    <select onChange={handleSortChange} value={sortBy}>
                        <option value="popularity">Sort by Popularity</option>
                        <option value="rating">Sort by Rating</option>
                    </select>

                    <select onChange={handleGenreChange} value={genre}>
                        <option value="All">All Genres</option>
                        <option value="28">Action</option>
                        <option value="35">Comedy</option>
                        <option value="18">Drama</option>
                    </select>
                </div>
            )}

            <div className="list__cards">
                {filteredMovies.length > 0 ? (
                    filteredMovies.map(movie => (
                        <Cards key={movie.id} movie={movie} />
                    ))
                ) : (
                    <p>No movies found.</p>
                )}
            </div>
        </div>
    );
};

export default MovieList;
