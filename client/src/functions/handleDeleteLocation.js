import Api from "../apis/Api";

async function handleDeleteLocation(
  event,
  locationList,
  setLocationList,
  selectedLocation
) {
  event.preventDefault();
  try {
    await Api.delete(`/locations/${selectedLocation.location_id}`);
    setLocationList(
      locationList.filter(
        (location) => location.location_id !== selectedLocation.location_id
      )
    );
  } catch (error) {
    console.error(error.message);
  }
}

export default handleDeleteLocation;
