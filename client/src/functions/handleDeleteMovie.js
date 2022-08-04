import Api from "../apis/Api";

async function handleDeleteMovie(
  event,
  movieList,
  setMovieList,
  selectedMovie
) {
  event.preventDefault();
  try {
    await Api.delete(`/movies/${selectedMovie.movie_id}`);
    setMovieList(
      movieList.filter((movie) => movie.movie_id !== selectedMovie.movie_id)
    );
  } catch (error) {
    console.error(error.message);
  }
}

export default handleDeleteMovie;
