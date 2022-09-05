import Api from "../apis/Api";
import { IRestaurant } from "../interfaces/IRestaurant";

async function handleAddRestaurant(restaurant: IRestaurant) {
  try {
    const { location_name, ...body } = {
      ...restaurant,
    };
    await Api.post("/restaurants", body);
  } catch (error: any) {
    console.error(error.message);
  }
}

export default handleAddRestaurant;
