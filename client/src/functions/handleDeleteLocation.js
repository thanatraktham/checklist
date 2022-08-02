async function handleDeleteLocation(
  event,
  locationList,
  setLocationList,
  selectedLocation
) {
  event.preventDefault();
  try {
    await fetch(
      `http://localhost:5000/locations/${selectedLocation.location_id}`,
      {
        method: "DELETE",
      }
    );
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
