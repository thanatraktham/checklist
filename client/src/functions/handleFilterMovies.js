async function handleFilterMovies(event, location_id, setMovieList) {
  event.preventDefault();
  let movies = [];
  try {
    if (location_id > 0) {
      movies = await fetch(
        `http://localhost:5000/movies/filter/${location_id}`
      );
    } else {
      movies = await fetch(`http://localhost:5000/movies/`);
    }
    const movieList = await movies.json();
    setMovieList(movieList);
  } catch (error) {
    console.error(error.message);
  }
}

export default handleFilterMovies;
