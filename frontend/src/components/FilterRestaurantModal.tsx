import React, { FC, useContext, useEffect, useState } from "react";
import { Autocomplete, Modal } from "@mui/material";
import "./Modal.css";
// import queryLocationList from "../functions/queryLocationList";
// import handleFilterRestaurants from "../functions/handleFilterRestaurants";
import { TextFieldSelect } from "../styles/InputStyles";
import { RestaurantTags } from "../constants/RestaurantTags";
import { RestaurantContext } from "../contexts/RestaurantContext";
import queryLocations from "../functions/queryLocations";
import { ILocation } from "../interfaces/ILocation";
import handleFilterRestaurants from "../functions/handleFilterRestaurants";

const FilterRestaurantModal: FC = () => {
  const {
    setRestaurants,
    showFilterRestaurantModal,
    setShowFilterRestaurantModal,
  } = useContext(RestaurantContext);
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<ILocation>({
    location_id: -1,
    location_name: "",
  });
  const [selectedTag, setSelectedTag] = useState({ tag_id: -1, tag_name: "" });

  useEffect(() => {
    let subscribed = true;
    queryLocations().then((response) => {
      if (subscribed && response) {
        setLocations(response);
      }
    });

    return () => {
      subscribed = false;
    };
    // eslint-disable-next-line
  }, []);

  const handleChangeLocation = (newLocation: ILocation | null) => {
    if (newLocation !== null) {
      setSelectedLocation(
        locations.find(
          (location) => location.location_name === newLocation.location_name
        ) || { location_id: -1, location_name: "" }
      );
    } else {
      setSelectedLocation({ location_id: -1, location_name: "" });
    }
  };
  const handleChangeTag = (
    newTag: { tag_id: number; tag_name: string } | string | null
  ) => {
    if (newTag !== null && typeof newTag !== "string") {
      setSelectedTag(newTag);
    } else {
      setSelectedTag({ tag_id: -1, tag_name: "" });
    }
  };

  return (
    <Modal
      className="modal-wrapper"
      open={showFilterRestaurantModal}
      onClose={() => setShowFilterRestaurantModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form className="modal-container">
        <strong>Filter By</strong>
        <Autocomplete
          id="select-location-list"
          defaultValue={selectedLocation}
          options={locations}
          getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === "string") {
              return option;
            }
            // Regular option
            return option.location_name;
          }}
          isOptionEqualToValue={(option, value) => {
            if (value) {
              return option === value;
            }
            return false;
          }}
          renderOption={(props, option) => (
            <li {...props}>{option.location_name}</li>
          )}
          onChange={(event, newValue) => {
            handleChangeLocation(newValue);
          }}
          renderInput={(params) => (
            <TextFieldSelect
              {...params}
              fullWidth
              size="small"
              sx={{ mt: 1 }}
              label="Location"
            />
          )}
        />
        <Autocomplete
          id="select-tag-list"
          // freeSolo
          defaultValue={selectedTag}
          onChange={(event, newValue) => {
            handleChangeTag(newValue);
          }}
          options={RestaurantTags}
          getOptionLabel={(option) => {
            if (typeof option === "string") {
              return option;
            } else {
              return option.tag_name;
            }
          }}
          // isOptionEqualToValue={(option, value) => {
          //   console.log(option);
          //   console.log(value);

          //   if (value) {
          //     return option === value;
          //   }
          //   return false;
          // }}
          renderOption={(props, option) => (
            <li {...props}>{option.tag_name}</li>
          )}
          renderInput={(params) => (
            <TextFieldSelect
              {...params}
              fullWidth
              size="small"
              sx={{ mt: 1 }}
              label="Tag"
            />
          )}
        />
        <div className="modal-buttonContainer">
          <button
            className="save-button"
            onClick={() => {
              setShowFilterRestaurantModal(false);
            }}
          >
            CANCEL
          </button>
          <button
            className="save-button"
            onClick={() => {
              handleFilterRestaurants(
                selectedLocation.location_id,
                selectedTag.tag_id
              ).then((response) => setRestaurants(response));
              setShowFilterRestaurantModal(false);
            }}
          >
            APPLY
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FilterRestaurantModal;
