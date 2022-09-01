import { Dispatch, SetStateAction } from "react";
import Api from "../apis/Api";
import { ILocation } from "../interfaces/ILocation";

async function handleChangeLocationName(
  newLocationName: string,
  locationIndex: number,
  locationList: ILocation[],
  setLocationList: Dispatch<SetStateAction<ILocation[]>>
) {
  let tempLocationList = locationList;
  tempLocationList[locationIndex].location_name = newLocationName;
  setLocationList(tempLocationList);
  try {
    await Api.put(`/locations/${tempLocationList[locationIndex].location_id}`, {
      location_name: newLocationName,
    });
  } catch (error: any) {
    console.error(error.message);
  }
}

export default handleChangeLocationName;
