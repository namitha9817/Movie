import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cards from "../../components/card/card";
import "./searchResults.css";

const SearchResults = () => {
    const { query } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState(query || "");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            if (searchQuery.trim()) {
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=5c8044317a39ce0ecbab4bdd7d2e26fc&query=${searchQuery}`);
                    const data = await response.json();
                    setSearchResults(data.results);
                } catch (error) {
                    console.error("Error fetching search results:", error);
                }
            } else {
                setSearchResults([]);
            }
        };

        fetchResults();
    }, [searchQuery]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        if (searchQuery.trim() === "") {
            setErrorMessage("Search cannot be empty.");
        } else {
            setErrorMessage("");
            // Update URL with new search query
            navigate(`/search/${searchQuery}`);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (value.trim() !== "") {
            setErrorMessage(""); // Clear error message if input is valid
        }
    };

    return (
        <div className="search-results">
            <h2>Search Results for "{searchQuery}"</h2>
            <form onSubmit={handleSearchSubmit} className="search-form">
                <div className="search-bar">
                    <input 
                        type="text" 
                        placeholder="Search movies..." 
                        value={searchQuery}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Error Message */}
                {errorMessage && (
                    <div className="error-bubble">
                        {errorMessage}
                        <div className="error-arrow"></div>
                    </div>
                )}
            </form>
            <div className="results__grid">
                {searchQuery.trim() && searchResults.length === 0 ? (
                    <p>No results found.</p>
                ) : (
                    searchResults.map((movie) => <Cards key={movie.id} movie={movie} />)
                )}
            </div>
        </div>
    );
};

export default SearchResults;
