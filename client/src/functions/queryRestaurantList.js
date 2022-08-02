async function queryRestaurantList(setRestaurantList) {
  try {
    const res = await fetch("http://localhost:5000/restaurants");
    const restaurantList = await res.json();
    setRestaurantList(restaurantList);
  } catch (error) {
    console.error(error.message);
  }
}

export default queryRestaurantList;
