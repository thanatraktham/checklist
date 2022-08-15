import Api from "../apis/Api";

async function queryRestaurants(setRestaurants) {
  try {
    const response = await Api.get("/restaurants");
    setRestaurants(response.data);
  } catch (error) {
    console.error(error.message);
  }
}

export default queryRestaurants;
