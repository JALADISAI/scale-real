// MoviesList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    axios.get('https://swapi.dev/api/films/?format=json')
      .then(response => setMovies(response.data.results))
      .catch(error => console.error(error));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div>
      <h1>Star Wars Movies</h1>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredMovies.map(movie => (
          <li key={movie.episode_id} onClick={() => handleMovieClick(movie)}>
            {movie.title}
          </li>
        ))}
      </ul>

      {selectedMovie && (
        <div>
          <h2>{selectedMovie.title}</h2>
          <p>Episode: {selectedMovie.episode_id}</p>
          <p>Director: {selectedMovie.director}</p>
          <p>Release Date: {selectedMovie.release_date}</p>
          <p>{selectedMovie.opening_crawl}</p>
        </div>
      )}
    </div>
  );
};

export default MoviesList;
