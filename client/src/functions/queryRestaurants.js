import Api from "../apis/Api";

async function queryRestaurants() {
  try {
    const response = await Api.get("/restaurants");
    return response;
  } catch (error) {
    console.error(error.message);
  }
}

export default queryRestaurants;
