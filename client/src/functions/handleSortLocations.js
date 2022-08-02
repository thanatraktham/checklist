import Api from "../apis/Api";

async function handleSortLocations(event, sortBy, sortOrder, setLocationList) {
  event.preventDefault();
  try {
    const response = await Api.get(
      `/locations${sortBy === "location_name" ? "/sort/location_name" : ""}${
        sortOrder === "desc" ? "/desc" : ""
      }`
    );
    setLocationList(response.data);
    console.log(response.statusText);
  } catch (error) {
    console.error(error.message);
  }
}

export default handleSortLocations;
