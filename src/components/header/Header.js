import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from '../../App'; // Adjust the import based on your file structure
import './Header.css';

const Header = () => {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    return (
        <div className={`header ${isDarkMode ? 'dark' : 'light'}`}>
            <div className="headerLeft">
                <Link to="/">
                    <img 
                        className="header__icon" 
                        alt="logo" 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" 
                    />
                </Link>
                <Link to="/movies/popular"><span>Popular</span></Link>
                <Link to="/movies/top_rated"><span>Top Rated</span></Link>
                <Link to="/movies/upcoming"><span>Upcoming</span></Link>
                <Link to="/recent-movies"><span>Recently Visited</span></Link>
            </div>
            <div className="headerRight">
                {/* Search Button */}
                <Link to="/search">
                    <button className="search-button">Search</button>
                </Link>
                <div className="bulb" style={{ paddingLeft: "3%" }} onClick={toggleTheme}>
                    <i className={`fas fa-lightbulb ${isDarkMode ? 'dark-mode-icon' : 'light-mode-icon'}`}></i>
                </div>
            </div>
        </div>
    );
};

export default Header;
