async function handleUpdateRestaurant(event, restaurant) {
  event.preventDefault();
  try {
    const { restaurant_id, location_name, ...body } = {
      ...restaurant,
    };
    await fetch(`http://localhost:5000/restaurants/${restaurant_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error(error.message);
  }
}

export default handleUpdateRestaurant;
