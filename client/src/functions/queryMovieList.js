import Api from "../apis/Api";

async function queryMovieList(setMovieList) {
  try {
    const response = await Api.get("/movies");
    setMovieList(response.data);
  } catch (error) {
    console.error(error.message);
  }
}

export default queryMovieList;
