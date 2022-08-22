import Api from "../apis/Api";

async function queryMovies() {
  try {
    const response = await Api.get("/movies");
    return response;
  } catch (error) {
    console.error(error.message);
  }
}

export default queryMovies;
