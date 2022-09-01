import { Dispatch, SetStateAction } from "react";
import Api from "../apis/Api";
import { ILocation } from "../interfaces/ILocation";

async function handleSortLocations(
  sortBy: string,
  sortOrder: string,
  setLocations: Dispatch<SetStateAction<ILocation[]>>
) {
  try {
    const response = await Api.get(
      `/locations${sortBy === "location_name" ? "/sort/location_name" : ""}${
        sortOrder === "desc" ? "/desc" : ""
      }`
    );
    setLocations(response.data);
  } catch (error: any) {
    console.error(error.message);
  }
}

export default handleSortLocations;
