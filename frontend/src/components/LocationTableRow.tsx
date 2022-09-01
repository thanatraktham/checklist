import {
  Delete,
  Done,
  DriveFileRenameOutlineTwoTone,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import {
  forwardRef,
  ForwardRefRenderFunction,
  useContext,
  useEffect,
  useState,
} from "react";
import { LocationContext } from "../contexts/LocationContext";
import { ILocation } from "../interfaces/ILocation";
import handleChangeLocationName from "../functions/handleChangeLocationName";
import "../pages/Restaurant.css";

type Props = {
  location: ILocation;
  locationIndex: number;
};

const LocationTableRow: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  props: { location: ILocation; locationIndex: number },
  ref
) => {
  const {
    setLocation,
    locations,
    setLocations,
    setShowConfirmDeleteLocationModal,
  } = useContext(LocationContext);
  const [displayLocation, setDisplayLocation] = useState(props.location);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    setDisplayLocation(props.location);
    // eslint-disable-next-line
  }, []);

  //   console.log(location);
  return (
    <div className="location-table-row" ref={ref}>
      <div>
        <span>{displayLocation.location_id}</span>
      </div>
      {!isEditing && (
        <div>
          <span>{displayLocation.location_name}</span>
        </div>
      )}
      {isEditing && (
        <div>
          <input
            defaultValue={displayLocation.location_name}
            // onKeyPress={(event) => {
            //   if (event.key === "Enter" && !!event.target) {
            //     handleChangeLocationName(
            //       event.target.value,
            //       props.locationIndex,
            //       locations,
            //       setLocations
            //     );
            //     setIsEditing(false);
            //   }
            // }}
            onBlur={(event) => {
              handleChangeLocationName(
                event.target.value,
                props.locationIndex,
                locations,
                setLocations
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
            setLocation(displayLocation);
            setShowConfirmDeleteLocationModal(true);
          }}
        />
      </Tooltip>
    </div>
  );
};

export default forwardRef(LocationTableRow);
