import Api from "../apis/Api";

async function handleAddRestaurant(event, restaurant) {
  event.preventDefault();
  try {
    const { location_name, ...body } = {
      ...restaurant,
    };
    const response = await Api.post("/restaurants", body);
    console.log(response.statusText);
  } catch (error) {
    console.error(error.message);
  }
}

export default handleAddRestaurant;
