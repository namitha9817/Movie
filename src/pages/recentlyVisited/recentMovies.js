import React, { useEffect, useState } from 'react';
import Cards from "../../components/card/card";
import "./recentMovies.css";

const RecentMoviesList = () => {
    const [recentMovies, setRecentMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const movies = JSON.parse(localStorage.getItem('recentMovies')) || [];
                console.log('Stored IDs:', movies);
        
                if (Array.isArray(movies) && movies.length > 0 && typeof movies[0] === 'object' && movies[0].id) {
                    const apiKey = '5c8044317a39ce0ecbab4bdd7d2e26fc';
                    const movieDetails = await Promise.all(
                        movies.map(async (movie) => {
                            const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US`);
                            if (!response.ok) {
                                throw new Error(`Error fetching movie with ID ${movie.id}: ${response.statusText}`);
                            }
                            const data = await response.json();
                            console.log('Movie Data:', data);
                            return data;
                        })
                    );
                    setRecentMovies(movieDetails);
                } else {
                    console.error('Invalid movie ID format');
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        

        fetchMovies();
    }, []);

    return (
        <div className='recentMov'>
            <h2>Recently Viewed Movies</h2>
            <div className="recent-movies-list">
                {recentMovies.length > 0 ? (
                    recentMovies.map((movie) => (
                        <Cards key={movie.id} movie={movie} />
                    ))
                ) : (
                    <p>No recent movies found.</p>
                )}
            </div>
        </div>
    );
};

export default RecentMoviesList;
