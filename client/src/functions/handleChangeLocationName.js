async function handleChangeLocationName(
  newLocationName,
  locationIndex,
  locationList,
  setLocationList
) {
  let tempLocationList = locationList;
  tempLocationList[locationIndex].location_name = newLocationName;
  setLocationList(tempLocationList);
  try {
    const body = {
      location_name: newLocationName,
    };
    await fetch(
      `http://localhost:5000/locations/${tempLocationList[locationIndex].location_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
  } catch (error) {
    console.error(error.message);
  }
}

export default handleChangeLocationName;
