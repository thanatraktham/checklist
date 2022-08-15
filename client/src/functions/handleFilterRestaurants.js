import Api from "../apis/Api";

async function handleFilterRestaurants(
  event,
  location_id,
  tag_id,
  setRestaurants
) {
  event.preventDefault();
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
    console.log(response.data);
    setRestaurants(response.data);
  } catch (error) {
    console.error(error.message);
  }
}

export default handleFilterRestaurants;
