async function queryRestaurantById(restaurant_id, setRestaurant) {
  try {
    const res = await fetch(
      `http://localhost:5000/restaurants/${restaurant_id}`
    );
    const restaurant = await res.json();
    setRestaurant(restaurant);
  } catch (error) {
    console.error(error.message);
  }
}

export default queryRestaurantById;
