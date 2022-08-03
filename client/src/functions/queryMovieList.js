import Api from "../apis/Api";

async function queryMovieList(setMovieList) {
  try {
    const response = await Api.get("/movies");
    setMovieList(response.data);
    console.log(response.statusText);
  } catch (error) {
    console.error(error.message);
  }
}

export default queryMovieList;
