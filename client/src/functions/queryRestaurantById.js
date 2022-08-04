import Api from "../apis/Api";

async function queryRestaurantById(restaurant_id, setRestaurant) {
  try {
    const response = await Api.get(`/restaurants/${restaurant_id}`);
    setRestaurant(response.data);
  } catch (error) {
    console.error(error.message);
  }
}

export default queryRestaurantById;
