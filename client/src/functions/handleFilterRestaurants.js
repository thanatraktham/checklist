async function handleFilterRestaurants(event, location_id, setRestaurantList) {
  event.preventDefault();
  let res = [];
  try {
    if (location_id > 0) {
      res = await fetch(
        `http://localhost:5000/restaurants/filter/${location_id}`
      );
    } else {
      res = await fetch(`http://localhost:5000/restaurants/`);
    }
    const restaurantList = await res.json();
    setRestaurantList(restaurantList);
  } catch (error) {
    console.error(error.message);
  }
}

export default handleFilterRestaurants;
