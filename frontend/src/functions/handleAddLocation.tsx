import { Dispatch, SetStateAction } from "react";
import Api from "../apis/Api";
import { ILocation } from "../interfaces/ILocation";

async function handleAddLocation(
  locations: ILocation[],
  setLocations: Dispatch<SetStateAction<ILocation[]>>,
  newLocationName: string
) {
  try {
    const response = await Api.post("/locations", {
      location_name: newLocationName,
    });
    const tempLocations = response.data;
    setLocations([...locations, ...tempLocations.rows]);
  } catch (error: any) {
    console.error(error.message);
  }
}

export default handleAddLocation;
