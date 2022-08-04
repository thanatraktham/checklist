import Api from "../apis/Api";

async function handleAddMovie(event, movie) {
  event.preventDefault();
  try {
    const { location_name, ...body } = {
      ...movie,
    };
    await Api.post("/movies", body);
  } catch (error) {
    console.error(error.message);
  }
}

export default handleAddMovie;
