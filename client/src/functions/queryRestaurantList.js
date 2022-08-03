import Api from "../apis/Api";

async function queryRestaurantList(setRestaurantList) {
  try {
    const response = await Api.get("/restaurants");
    console.log(response);
    setRestaurantList(response.data);
  } catch (error) {
    console.error(error.message);
  }
}

export default queryRestaurantList;
