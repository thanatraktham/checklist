import Api from "../apis/Api";

async function handleFilterRestaurants(event, location_id, setRestaurantList) {
  event.preventDefault();
  try {
    const response = await Api.get(
      `/restaurants/${location_id > 0 ? `filter/${location_id}` : ""}`
    );
    setRestaurantList(response.data);
  } catch (error) {
    console.error(error.message);
  }
}

export default handleFilterRestaurants;
