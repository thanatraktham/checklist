async function queryMovieList(setMovieList) {
  try {
    const res = await fetch("http://localhost:5000/movies");
    const movieList = await res.json();
    setMovieList(movieList);
  } catch (error) {
    console.error(error.message);
  }
}

export default queryMovieList;
