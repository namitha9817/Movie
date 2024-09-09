import React, { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./card.css";
import { Link } from "react-router-dom";

const Cards = ({ movie }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="cards">
                    <SkeletonTheme color="#202020" highlightColor="#444">
                        <Skeleton height={300} duration={2} enableAnimation={true} direction={'ltr'} />
                    </SkeletonTheme>
                </div>
            ) : (
                <Link to={`/movie/${movie.id}`}>
                    <div className="cards">
                        <img
                            className="cards__img"
                            src={
                                movie && movie.poster_path
                                    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                                    : "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-768x1129.jpg"  // Replace this with your fallback image URL
                            }
                            alt={movie?.original_title || "Default Poster"}
                        />
                        <div className="cards__overlay">
                            <div className="card__title">{movie?.original_title || "Unknown Title"}</div>
                            <div className="card__runtime">
                                {movie?.release_date || "Unknown Date"}
                                <span className="card__rating">
                                    {movie?.vote_average || "N/A"} <i className="fas fa-star" />
                                </span>
                            </div>
                            <div className="card__description">
                                {movie?.overview ? movie.overview.slice(0, 118) + "..." : "No description available"}
                            </div>
                        </div>
                    </div>
                </Link>
            )}
        </>
    );
};

export default Cards;
