import Api from "../apis/Api";

async function handleFilterRestaurants(location_id: number, tag_id: number) {
  try {
    let response = null;
    if (location_id > 0) {
      if (tag_id > 0) {
        response = await Api.get(
          `/restaurants/filter/${location_id}/${tag_id}`
        );
      } else {
        response = await Api.get(`/restaurants/filter_location/${location_id}`);
      }
    } else {
      if (tag_id > 0) {
        response = await Api.get(`/restaurants/filter_tag/${tag_id}`);
      } else {
        response = await Api.get(`/restaurants`);
      }
    }
    return response.data;
  } catch (error: any) {
    console.error(error.message);
  }
}

export default handleFilterRestaurants;
