import Api from "../apis/Api";

async function handleUpdateMovie(event, movie) {
  event.preventDefault();
  try {
    const { movie_id, location_name, ...body } = {
      ...movie,
    };
    await Api.put(`/movies/${movie_id}`, body);
  } catch (error) {
    console.error(error.message);
  }
}

export default handleUpdateMovie;
