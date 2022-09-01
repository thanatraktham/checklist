import { Dispatch, SetStateAction } from "react";
import Api from "../apis/Api";
import { ILocation } from "../interfaces/ILocation";

async function queryLocations(
  setLocations: Dispatch<SetStateAction<ILocation[]>>,
  filterTheater: boolean = false
) {
  try {
    const locations = await Api.get("/locations");
    let locationList = locations.data;
    if (filterTheater) {
      locationList = locationList.filter(
        (location: ILocation) => location.theater
      );
    }
    setLocations(locationList);
  } catch (error: any) {
    console.error(error.message);
  }
}

export default queryLocations;
