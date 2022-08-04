import Api from "../apis/Api";

async function handleAddRestaurant(event, restaurant) {
  event.preventDefault();
  try {
    const { location_name, ...body } = {
      ...restaurant,
    };
    await Api.post("/restaurants", body);
  } catch (error) {
    console.error(error.message);
  }
}

export default handleAddRestaurant;
