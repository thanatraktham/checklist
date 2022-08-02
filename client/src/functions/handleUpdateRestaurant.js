import Api from "../apis/Api";

async function handleUpdateRestaurant(event, restaurant) {
  event.preventDefault();
  try {
    const { restaurant_id, location_name, ...body } = {
      ...restaurant,
    };
    const response = await Api.put(`/restaurants/${restaurant_id}`, body);
    console.log(response.statusText);
  } catch (error) {
    console.error(error.message);
  }
}

export default handleUpdateRestaurant;
