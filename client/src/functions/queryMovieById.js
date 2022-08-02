async function queryMovieById(movie_id, setMovie) {
  try {
    const res = await fetch(`http://localhost:5000/movies/${movie_id}`);
    const movie = await res.json();
    setMovie(movie);
  } catch (error) {
    console.error(error.message);
  }
}

export default queryMovieById;
