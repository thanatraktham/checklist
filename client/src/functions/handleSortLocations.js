async function handleSortLocations(event, sortBy, sortOrder, setLocationList) {
  event.preventDefault();
  try {
    const res = await fetch(
      `http://localhost:5000/locations${
        sortBy === "location_name" ? "/sort/location_name" : ""
      }${sortOrder === "desc" ? "/desc" : ""}`
    );
    const locationList = await res.json();
    setLocationList(locationList);
  } catch (error) {
    console.error(error.message);
  }
}

export default handleSortLocations;
