async function handleAddMovie(event, movie) {
  event.preventDefault();
  try {
    const { location_name, ...body } = {
      ...movie,
    };
    const response = await fetch("http://localhost:5000/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log(response);
  } catch (error) {
    console.error(error.message);
  }
}

export default handleAddMovie;
