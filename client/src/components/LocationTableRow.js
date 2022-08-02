import {
  Delete,
  Done,
  DriveFileRenameOutlineTwoTone,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React, { forwardRef, useState } from "react";
import handleChangeLocationName from "../functions/handleChangeLocationName";
import "../pages/Restaurant.css";

const LocationTableRow = forwardRef((props, ref) => {
  const {
    location,
    locationIndex,
    locationList,
    setLocationList,
    setSelectedLocation,
    setShowConfirmDeleteLocationModal,
  } = { ...props };
  const [isEditing, setIsEditing] = useState(false);
  //   console.log(location);
  return (
    <div className="location-table-row" ref={ref}>
      <div>
        <span>{location.location_id}</span>
      </div>
      {!isEditing && (
        <div>
          <span>{location.location_name}</span>
        </div>
      )}
      {isEditing && (
        <div>
          <input
            defaultValue={location.location_name}
            onKeyPress={(event) => {
              if (event.key === "Enter" && !!event.target.value) {
                handleChangeLocationName(
                  event.target.value,
                  locationIndex,
                  locationList,
                  setLocationList
                );
                setIsEditing(false);
              }
            }}
            onBlur={(event) => {
              handleChangeLocationName(
                event.target.value,
                locationIndex,
                locationList,
                setLocationList
              );
              setIsEditing(false);
            }}
          />
        </div>
      )}
      {!isEditing && (
        <Tooltip title="Rename">
          <DriveFileRenameOutlineTwoTone
            className="location-icon"
            onClick={() => {
              setIsEditing(true);
            }}
          />
        </Tooltip>
      )}
      {isEditing && (
        <Tooltip title="Submit">
          <Done
            className="location-icon"
            onClick={() => {
              setIsEditing(false);
            }}
          />
        </Tooltip>
      )}
      <Tooltip title="Delete">
        <Delete
          className="location-icon"
          onClick={() => {
            setSelectedLocation(location);
            setShowConfirmDeleteLocationModal(true);
          }}
        />
      </Tooltip>
    </div>
  );
});

export default LocationTableRow;
