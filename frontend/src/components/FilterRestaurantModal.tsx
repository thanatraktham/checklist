import React, { FC, useContext, useEffect, useState } from "react";
import { Autocomplete, Modal } from "@mui/material";
import "./Modal.css";
// import queryLocationList from "../functions/queryLocationList";
// import handleFilterRestaurants from "../functions/handleFilterRestaurants";
import { TextFieldSelect } from "../styles/InputStyles";
import { RestaurantTags } from "../constants/RestaurantTags";
import { RestaurantContext } from "../contexts/RestaurantContext";

const FilterRestaurantModal: FC = () => {
  const {
    setRestaurants,
    showFilterRestaurantModal,
    setShowFilterRestaurantModal,
  } = useContext(RestaurantContext);
  const [locationList, setlocationList] = useState();
  const [selectedLocation, setSelectedLocation] = useState({
    location_id: -1,
    location_name: "",
  });
  const [selectedTag, setSelectedTag] = useState({ id: -1, tag: "" });

  useEffect(() => {
    // queryLocationList(setlocationList);
  }, []);

  //   const handleChangeLocation = (newLocation) => {
  //     if (newLocation) {
  //       setSelectedLocation(
  //         locationList.filter(
  //           (location) => location.location_name === newLocation
  //         )[0]
  //       );
  //     } else {
  //       setSelectedLocation({ location_id: -1, location_name: "" });
  //     }
  //   };
  const handleChangeTag = (newTag: { id: number; tag: string } | null) => {
    if (newTag) {
      setSelectedTag(newTag);
    } else {
      setSelectedTag({ id: -1, tag: "" });
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
        {/* {locationList && (
          <Autocomplete
            id="select-location-list"
            value={selectedLocation.location_name}
            onChange={(event, newValue) => {
              handleChangeLocation(newValue);
            }}
            options={locationList?.map((location) => location.location_name)}
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
        )} */}
        <Autocomplete
          id="select-tag-list"
          value={selectedTag}
          onChange={(event, newValue) => {
            handleChangeTag(newValue);
          }}
          options={RestaurantTags}
          getOptionLabel={(option) => {
            if (typeof option === "string") {
              return option;
            } else {
              return option.tag;
            }
          }}
          isOptionEqualToValue={(option, value) => {
            if (typeof value === "string") return true;
            return option.tag === value.tag;
          }}
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
            onClick={(event) => {
              //   handleFilterRestaurants(
              //     event,
              //     selectedLocation.location_id,
              //     selectedTag.id,
              //     setRestaurants
              //   );
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
