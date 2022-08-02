async function handleAddRestaurant(event, restaurant) {
  event.preventDefault();
  try {
    const { location_name, ...body } = {
      ...restaurant,
    };
    const response = await fetch("http://localhost:5000/restaurants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log(response);
  } catch (error) {
    console.error(error.message);
  }
}

export default handleAddRestaurant;
