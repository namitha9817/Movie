import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom"; // useLocation instead of useHistory
import { ThemeContext } from '../../App'; // Adjust the import based on your file structure
import './Header.css';

const Header = () => {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);  // Reference to the menu element
    const location = useLocation();  // Used to detect route changes

    const toggleMenu = () => {
        console.log('Toggling menu:', !isMenuOpen);
        setIsMenuOpen(prevState => !prevState);
    };

    // Close menu if clicked outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

    }, []);

    // Close menu on route change
    useEffect(() => {
        console.log('Route changed');
        setIsMenuOpen(false);
    }, [location]);
    
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
                
            </div>
            <div className="headerRight">
                {/* Hamburger Icon */}
                <div className="hamburger-icon" onClick={toggleMenu}>
                    <i className="fas fa-bars"></i>
                </div>
                {/* Menu links will be conditionally rendered based on the hamburger toggle */}
                <nav className={`menu ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
                    <Link to="/movies/popular" onClick={() => setIsMenuOpen(false)}><span>Popular</span></Link>
                    <Link to="/movies/top_rated" onClick={() => setIsMenuOpen(false)}><span>Top Rated</span></Link>
                    <Link to="/movies/upcoming" onClick={() => setIsMenuOpen(false)}><span>Upcoming</span></Link>
                    <Link to="/recent-movies" onClick={() => setIsMenuOpen(false)}><span>Recently Visited</span></Link>
                </nav>
                {/* Search Button */}
                <Link to="/search" className="search">
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
