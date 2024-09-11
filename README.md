# Movie APP

## Overview

This React application showcases popular, top, and upcoming movies by fetching data from the TMDB API. The app features a slider on the homepage, movie lists with sorting and filtering options, dynamic search functionality, and a movie details page. Users can switch between dark and light modes, and recently visited movies are tracked using local storage.

## Link : https://namitha9817.github.io/Movie/ 

## Features

- **Homepage**:
  - Slider showcasing the latest movies using the `react-slider` package.
  - List of popular movies.

- **Movie List Pages**:
  - **Upcoming**, **Popular**, and **Top Rated** movies.
  - Sorting by popularity or rating and filtering by genre.

- **Movie Details Page**:
  - Detailed information about each movie, including release date, rating, runtime, synopsis, and links to the movie's official website and IMDb page.

- **Search Page**:
  - Live search functionality with form validation.

- **Loading Skeletons**:
  - Utilized the `react-loading-skeleton` package to display skeleton screens while movie data is being fetched, improving user experience during loading times.

- **Additional Features**:
  - Dark/Light mode toggle.
  - Recently visited movies saved in local storage.
  - Default movie poster for entries missing a poster.

## Setup

To set up the project locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/movie-app.git
   cd movie-app

2. **Install Dependencies: Ensure you have Node.js installed. Then, run:**:
   ```bash
   npm install

3. **Run the Application:**:
   ```bash
   npm start
This will start the development server and open the app in your default browser.

## Running Tests

To run the application tests, use the following command:
    npm test

## Why TMDB API?

The [TMDB API](https://www.themoviedb.org/documentation/api) was chosen for its comprehensive and frequently updated movie database. It provides rich information about movies, including ratings, release dates, and synopses, which are crucial for the features of this application. TMDB also offers extensive documentation and community support, making it a reliable choice for movie-related data.

## Development Decisions

- **Slider Implementation**:
  - Used `react-slider` for the movie slider on the homepage due to its ease of use and customization options. This allows for an interactive and visually appealing way to display top movies.

- **Loading Skeletons**:
  - Used `react-loading-skeleton` to provide a smooth user experience by showing skeleton screens while the movie data is being loaded. This approach helps in managing user expectations and improving perceived performance.

- **Movie Posters**:
  - Added a default movie poster for entries without a poster to maintain visual consistency and avoid awkward gaps in the UI.

- **Form Validation**:
  - Implemented live search and form validation to enhance user experience and ensure that the search functionality works correctly, providing warnings for empty search inputs.

- **Local Storage**:
  - Utilized local storage to save recently visited movies and user theme preference (dark/light mode), ensuring these settings persist across page reloads and sessions.

