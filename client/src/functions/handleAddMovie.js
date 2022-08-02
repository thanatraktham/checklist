import Api from "../apis/Api";

async function handleAddMovie(event, movie) {
  event.preventDefault();
  try {
    const { location_name, ...body } = {
      ...movie,
    };
    const response = await Api.post("/movies", body);
    console.log(response.statusText);
  } catch (error) {
    console.error(error.message);
  }
}

export default handleAddMovie;
