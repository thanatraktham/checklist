import Api from "../apis/Api";
import { IRestaurant } from "../interfaces/IRestaurant";

async function handleUpdateRestaurant(restaurant: IRestaurant) {
  try {
    const { restaurant_id, location_name, ...body } = {
      ...restaurant,
    };
    await Api.put(`/restaurants/${restaurant_id}`, body);
  } catch (error: any) {
    console.error(error.message);
  }
}

export default handleUpdateRestaurant;
