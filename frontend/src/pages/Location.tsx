import { AddCircle, ArrowDropDown } from "@mui/icons-material";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import ConfirmDeleteLocationModal from "../components/ConfirmDeleteLocationModal";
import LocationTableRow from "../components/LocationTableRow";
import Navbar from "../components/Navbar";
import handleAddLocation from "../functions/handleAddLocation";
import handleSortLocations from "../functions/handleSortLocations";
import queryLocations from "../functions/queryLocations";
import { arrowIconStyle } from "../styles/IconStyle";
import "./Location.css";
import FlipMove from "react-flip-move";
import { LocationContext } from "../contexts/LocationContext";

const Location = () => {
  const { locations, setLocations } = useContext(LocationContext);
  const [reload, setReload] = useState<boolean>(false);
  const [sortById, setSortById] = useState<string>("desc");
  const [sortByName, setSortByName] = useState<string>("desc");
  const [newLocationName, setNewLocationName] = useState<string>("");

  function toggleSortOrder(
    sortBy: string,
    setSortBy: Dispatch<SetStateAction<string>>
  ) {
    if (sortBy === "asc") {
      setSortBy("desc");
    } else if (sortBy === "desc") {
      setSortBy("asc");
    }
  }

  useEffect(() => {
    queryLocations(setLocations);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="location-container">
      <Navbar>LOCATION</Navbar>
      <div className="location-add">
        <input
          placeholder="add location"
          defaultValue={newLocationName}
          onKeyPress={(event) => {
            if (event.key === "Enter" && !!event.target) {
              // handleAddLocation(
              //   event,
              //   locations,
              //   setLocations,
              //   newLocationName
              // );
              setReload(!reload);
            }
          }}
          onChange={(event) => {
            setNewLocationName(event.target.value);
          }}
        />
        <AddCircle
          className="location-icon"
          onClick={(event) => {
            handleAddLocation(locations, setLocations, newLocationName);
            setReload(!reload);
          }}
        />
      </div>
      <div className="location-table-container">
        <div className="location-table">
          <div className="location-table-header">
            <div>
              <strong>ID</strong>
              <ArrowDropDown
                sx={arrowIconStyle(sortById === "asc")}
                onClick={() => {
                  toggleSortOrder(sortById, setSortById);
                  handleSortLocations("location_id", sortById, setLocations);
                }}
              />
            </div>
            <div>
              <strong>Location</strong>
              <ArrowDropDown
                sx={arrowIconStyle(sortByName === "asc")}
                onClick={() => {
                  toggleSortOrder(sortByName, setSortByName);
                  handleSortLocations(
                    "location_name",
                    sortByName,
                    setLocations
                  );
                }}
              />
            </div>
          </div>
          <div className="location-table-body">
            <FlipMove>
              {locations &&
                locations.map((location, locationIndex) => (
                  <LocationTableRow
                    key={location.location_id}
                    location={location}
                    locationIndex={locationIndex}
                  />
                ))}
            </FlipMove>
          </div>
        </div>
      </div>
      <ConfirmDeleteLocationModal />
    </div>
  );
};

export default Location;
