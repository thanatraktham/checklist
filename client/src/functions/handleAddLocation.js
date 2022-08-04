import Api from "../apis/Api";

async function handleAddLocation(
  event,
  locationList,
  setLocationList,
  newLocationName
) {
  event.preventDefault();
  try {
    const response = await Api.post("/locations", {
      location_name: newLocationName,
    });
    const tempLocationList = response.data;
    setLocationList([...locationList, ...tempLocationList.rows]);
  } catch (error) {
    console.error(error.message);
  }
}

export default handleAddLocation;
