import Api from "../apis/Api";

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
    const response = await Api.put(
      `/locations/${tempLocationList[locationIndex].location_id}`,
      {
        location_name: newLocationName,
      }
    );
    console.log(response.statusText);
  } catch (error) {
    console.error(error.message);
  }
}

export default handleChangeLocationName;
