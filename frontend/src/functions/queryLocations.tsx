import Api from "../apis/Api";
import { ILocation } from "../interfaces/ILocation";

async function queryLocations(filterTheater: boolean = false) {
  try {
    const response = await Api.get("/locations");
    let locationList = response.data;
    if (filterTheater) {
      locationList = locationList.filter(
        (location: ILocation) => location.theater
      );
    }
    return locationList;
  } catch (error: any) {
    console.error(error.message);
  }
}

export default queryLocations;
