import Api from "../apis/Api";

async function handleFilterMovies(event, location_id, setMovieList) {
  event.preventDefault();
  try {
    const response = await Api.get(
      `/movies/${location_id > 0 ? `filter/${location_id}` : ""}`
    );
    setMovieList(response.data);
  } catch (error) {
    console.error(error.message);
  }
}

export default handleFilterMovies;
