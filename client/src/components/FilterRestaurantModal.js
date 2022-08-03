import React, { useEffect, useState } from "react";
import { Autocomplete, Modal } from "@mui/material";
import "./Modal.css";
import queryLocationList from "../functions/queryLocationList";
import handleFilterRestaurants from "../functions/handleFilterRestaurants";
import { TextFieldSelect } from "../styles/InputStyles";

const FilterRestaurantModal = ({
  restaurantList,
  setRestaurantList,
  showFilterRestaurantModal,
  setShowFilterRestaurantModal,
}) => {
  const [locationList, setlocationList] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({
    location_id: -1,
    location_name: "",
  });

  useEffect(() => {
    queryLocationList(setlocationList);
  }, []);

  const handleChange = (newLocation) => {
    if (newLocation) {
      setSelectedLocation(
        locationList.filter(
          (location) => location.location_name === newLocation
        )[0]
      );
    } else {
      setSelectedLocation({ location_id: -1, location_name: "" });
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
          id="select-locationList"
          value={selectedLocation.location_name}
          onChange={(event, newValue) => {
            handleChange(newValue);
          }}
          options={locationList.map((location) => location.location_name)}
          isOptionEqualToValue={(option, value) =>
            option.location_name === value.location_name
          }
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
            onClick={(event) => {
              handleFilterRestaurants(
                event,
                selectedLocation.location_id,
                setRestaurantList
              );
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
