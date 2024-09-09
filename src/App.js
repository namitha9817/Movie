import React, { useState, createContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import SearchResults from './pages/searchResults/searchResults';
import RecentMovies from './pages/recentlyVisited/recentMovies'; 

// Create ThemeContext
export const ThemeContext = createContext();

function App() {
    // Initialize theme state from local storage or default to light mode
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('isDarkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    // Toggle function to switch theme and save to local storage
    const toggleTheme = () => {
        setIsDarkMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('isDarkMode', JSON.stringify(newMode));
            return newMode;
        });
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                <Router>
                    <Header />
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="movie/:id" element={<Movie />} />
                        <Route path="movies/:type" element={<MovieList />} />
                        <Route path="search/" element={<SearchResults />} />
                        <Route path="/*" element={<h1>Error Page</h1>} />
                        <Route path="/recent-movies" element={<RecentMovies />} />
                    </Routes>
                </Router>
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
