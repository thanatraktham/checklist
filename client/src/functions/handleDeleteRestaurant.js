async function handleDeleteRestaurant(
  event,
  restaurantList,
  setRestaurantList,
  selectedRestaurant
) {
  event.preventDefault();
  try {
    await fetch(
      `http://localhost:5000/restaurants/${selectedRestaurant.restaurant_id}`,
      {
        method: "DELETE",
      }
    );
    setRestaurantList(
      restaurantList.filter(
        (restaurant) =>
          restaurant.restaurant_id !== selectedRestaurant.restaurant_id
      )
    );
  } catch (error) {
    console.error(error.message);
  }
}

export default handleDeleteRestaurant;
