import { Dispatch, SetStateAction } from "react";
import Api from "../apis/Api";
import { ILocation } from "../interfaces/ILocation";

async function handleDeleteLocation(
  locations: ILocation[],
  setLocations: Dispatch<SetStateAction<ILocation[]>>,
  location: ILocation
) {
  try {
    await Api.delete(`/locations/${location.location_id}`);
    setLocations(
      locations.filter(
        (element) => element.location_id !== location.location_id
      )
    );
  } catch (error: any) {
    console.error(error.message);
  }
}

export default handleDeleteLocation;
