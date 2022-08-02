async function handleDeleteMovie(
  event,
  movieList,
  setMovieList,
  selectedMovie
) {
  event.preventDefault();
  try {
    await fetch(`http://localhost:5000/movies/${selectedMovie.movie_id}`, {
      method: "DELETE",
    });
    setMovieList(
      movieList.filter((movie) => movie.movie_id !== selectedMovie.movie_id)
    );
  } catch (error) {
    console.error(error.message);
  }
}

export default handleDeleteMovie;
