// import { getLocalStorage, setLocalStorage } from "./util.mjs";
const apiKey = '853b19f1916650afe0cb18602242a747'; 
const apiUrl = 'https://api.themoviedb.org/3';

// Function to fetch and display movies
async function fetchMovies(searchQuery = '') {
  let endpoint = '/movie/popular';

  if (searchQuery) {
    endpoint = '/search/movie';
    searchQuery = encodeURIComponent(searchQuery);
  }

  const response = await fetch(`${apiUrl}${endpoint}?api_key=${apiKey}&query=${searchQuery}`);
  const data = await response.json();

  const moviesContainer = document.getElementById('movies');
  moviesContainer.innerHTML = '';

  if (data.results.length === 0) {
    moviesContainer.innerHTML = '<p>No movies found.</p>';
    return;
  }

  data.results.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.innerHTML = `
      <h2>${movie.title}</h2>
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" >
      <p>${movie.overview}</p>
      <button onclick="showMovieDetails(${movie.id})">Details</button>
      <button onclick="playTrailer(${movie.id})">Play Trailer</button>
    `;
    moviesContainer.appendChild(movieElement);
  });
}

// Function to show movie details
async function showMovieDetails(movieId) {
  const response = await fetch(`${apiUrl}/movie/${movieId}?api_key=${apiKey}`);
  const movie = await response.json();

  const movieDetailsContainer = document.getElementById('movieDetails');
  movieDetailsContainer.innerHTML = `
    <h2>${movie.title}</h2>
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    <p>${movie.overview}</p>
    <p>Release Date: ${movie.release_date}</p>
    <p>Rating: ${movie.vote_average}</p>
    <button onclick="playTrailer(${movie.id})">Play Trailer</button>
  `;
}

// Function to play movie trailer
async function playTrailer(movieId) {
  const response = await fetch(`${apiUrl}/movie/${movieId}/videos?api_key=${apiKey}`);
  const data = await response.json();
  
  if (data.results.length === 0) {
    alert('No trailers found for this movie.');
    return;
  }
  
  const trailerKey = data.results[0].key;
  const trailerUrl = `https://www.youtube.com/watch?v=${trailerKey}`;
  window.open(trailerUrl, '_blank');
}

// Function to handle form submission
document.getElementById('searchForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const searchInput = document.getElementById('searchInput');
  const searchQuery = searchInput.value;
  fetchMovies(searchQuery);
  searchInput.value = '';
});

// Initial fetch to display popular movies
fetchMovies();





 