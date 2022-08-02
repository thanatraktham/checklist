import Api from "../apis/Api";

async function queryLocationList(setLocationList, filterTheater = false) {
  try {
    const locations = await Api.get("/locations");
    let locationList = locations.data;
    if (filterTheater) {
      locationList = locationList.filter((location) => location.theater);
    }
    setLocationList(locationList);
  } catch (error) {
    console.error(error.message);
  }
}

export default queryLocationList;
