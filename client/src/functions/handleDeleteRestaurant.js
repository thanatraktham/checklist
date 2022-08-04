import Api from "../apis/Api";

async function handleDeleteRestaurant(
  event,
  restaurantList,
  setRestaurantList,
  selectedRestaurant
) {
  event.preventDefault();
  try {
    await Api.delete(`/restaurants/${selectedRestaurant.restaurant_id}`);
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
