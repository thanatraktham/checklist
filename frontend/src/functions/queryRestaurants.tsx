import Api from "../apis/Api";
import { IRestaurant } from "../interfaces/IRestaurant";

async function queryRestaurants() {
  try {
    const response = await Api.get<IRestaurant[]>("/restaurants");
    return response;
  } catch (error: any) {
    console.error(error.message);
  }
}

export default queryRestaurants;
