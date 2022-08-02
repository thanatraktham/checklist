async function handleAddLocation(
  event,
  locationList,
  setLocationList,
  newLocationName
) {
  event.preventDefault();
  try {
    const body = { location_name: newLocationName };
    const response = await fetch("http://localhost:5000/locations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const tempLocationList = await response.json();
    console.log(tempLocationList.rows);
    setLocationList([...locationList, ...tempLocationList.rows]);
    console.log(response);
  } catch (error) {
    console.error(error.message);
  }
}

export default handleAddLocation;
