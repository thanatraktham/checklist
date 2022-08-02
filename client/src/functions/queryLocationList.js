async function queryLocationList(setLocationList, filterTheater = false) {
  try {
    const locations = await fetch("http://localhost:5000/locations");
    let locationList = await locations.json();
    if (filterTheater) {
      locationList = locationList.filter((location) => location.theater);
    }
    setLocationList(locationList);
  } catch (error) {
    console.error(error.message);
  }
}

export default queryLocationList;
