import { AddCircle, ArrowDropDown } from "@mui/icons-material";
import React, { useState } from "react";
import ConfirmDeleteLocationModal from "../components/ConfirmDeleteLocationModal";
import LocationTableRow from "../components/LocationTableRow";
import Navbar from "../components/Navbar";
import handleAddLocation from "../functions/handleAddLocation";
import handleSortLocations from "../functions/handleSortLocations";
import queryLocationList from "../functions/queryLocationList";
import { arrowIconStyle } from "../styles/IconStyle";
import "./Location.css";
import FlipMove from "react-flip-move";

const Location = () => {
  const [reload, setReload] = useState(false);
  const [locationList, setLocationList] = useState([]);
  const [sortById, setSortById] = useState("desc");
  const [sortByName, setSortByName] = useState("desc");
  const [showConfirmDeleteLocationModal, setShowConfirmDeleteLocationModal] =
    useState(false);
  const [selectedLocation, setSelectedLocation] = useState();
  const [newLocationName, setNewLocationName] = useState("");

  function toggleSortOrder(sortBy, setSortBy) {
    if (sortBy === "asc") {
      setSortBy("desc");
    } else if (sortBy === "desc") {
      setSortBy("asc");
    }
  }

  if (!!locationList.length) {
    return (
      <div className="location-container">
        <Navbar>LOCATION</Navbar>
        <div className="location-add">
          <input
            placeholder="add location"
            defaultValue={newLocationName}
            onKeyPress={(event) => {
              if (event.key === "Enter" && !!event.target.value) {
                handleAddLocation(
                  event,
                  locationList,
                  setLocationList,
                  newLocationName
                );
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
              handleAddLocation(
                event,
                locationList,
                setLocationList,
                newLocationName
              );
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
                  onClick={(event) => {
                    toggleSortOrder(sortById, setSortById);
                    handleSortLocations(
                      event,
                      "location_id",
                      sortById,
                      setLocationList
                    );
                  }}
                />
              </div>
              <div>
                <strong>Location</strong>
                <ArrowDropDown
                  sx={arrowIconStyle(sortByName === "asc")}
                  onClick={(event) => {
                    toggleSortOrder(sortByName, setSortByName);
                    handleSortLocations(
                      event,
                      "location_name",
                      sortByName,
                      setLocationList
                    );
                  }}
                />
              </div>
            </div>
            <div className="location-table-body">
              <FlipMove>
                {locationList.map((location, locationIndex) => (
                  <LocationTableRow
                    key={location.location_id}
                    location={location}
                    locationIndex={locationIndex}
                    locationList={locationList}
                    setLocationList={setLocationList}
                    setSelectedLocation={setSelectedLocation}
                    setShowConfirmDeleteLocationModal={
                      setShowConfirmDeleteLocationModal
                    }
                  />
                ))}
              </FlipMove>
            </div>
          </div>
        </div>
        <ConfirmDeleteLocationModal
          locationList={locationList}
          setLocationList={setLocationList}
          showConfirmDeleteLocationModal={showConfirmDeleteLocationModal}
          setShowConfirmDeleteLocationModal={setShowConfirmDeleteLocationModal}
          selectedLocation={selectedLocation}
        />
      </div>
    );
  } else {
    queryLocationList(setLocationList);
    return <div>Loading . . .</div>;
  }
};

export default Location;
