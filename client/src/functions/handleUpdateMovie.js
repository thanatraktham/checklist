async function handleUpdateMovie(event, movie) {
  event.preventDefault();
  try {
    const { movie_id, location_name, ...body } = {
      ...movie,
    };
    const res = await fetch(`http://localhost:5000/movies/${movie_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log(res);
  } catch (error) {
    console.error(error.message);
  }
}

export default handleUpdateMovie;
