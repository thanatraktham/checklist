import Api from "../apis/Api";

async function handleDeleteRestaurant(
  event,
  restaurantList,
  setRestaurants,
  selectedRestaurant
) {
  event.preventDefault();
  try {
    await Api.delete(`/restaurants/${selectedRestaurant.restaurant_id}`);
    setRestaurants(
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
