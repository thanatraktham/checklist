async function handleSortMovies(event, sortBy, movieList, setMovieList) {
  event.preventDefault();
  let tempMovieList = movieList;
  tempMovieList.sort((lhs, rhs) => {
    switch (sortBy) {
      case "movie_name":
        return rhs.movie_name > lhs.movie_name ? -1 : 1;
      case "rating":
        return rhs.rating - lhs.rating;
      case "imdb":
        return rhs.imdb - lhs.imdb;
      case "rotten_tomatoes":
        return rhs.rotten_tomatoes - lhs.rotten_tomatoes;
      case "watch_date":
        return rhs.watch_date > lhs.watch_date ? 1 : -1;
      default:
        return rhs.movie_id - lhs.movie_id;
    }
  });
  setMovieList(tempMovieList);
}

export default handleSortMovies;
