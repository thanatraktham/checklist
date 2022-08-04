import Api from "../apis/Api";

async function queryMovieById(movie_id, setMovie) {
  try {
    const response = await Api.get(`/movies/${movie_id}`);
    setMovie(response.data);
  } catch (error) {
    console.error(error.message);
  }
}

export default queryMovieById;
