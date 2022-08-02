import React, { useState } from "react";
import { FormControlLabel, Modal, Radio, RadioGroup } from "@mui/material";
import "./Modal.css";
import handleSortRestaurants from "../functions/handleSortRestaurants";

const SORTLIST = [
  { label: "restaurant name", value: "restaurant_name" },
  { label: "rating", value: "rating" },
  { label: "visit date", value: "visit_date" },
];

const SortRestaurantModal = ({
  restaurantList,
  setRestaurantList,
  showSortRestaurantModal,
  setShowSortRestaurantModal,
}) => {
  const [sortBy, setSortBy] = useState("restaurant_id");

  const handleChange = (newSort) => {
    setSortBy(newSort);
  };

  return (
    <Modal
      className="modal-wrapper"
      open={showSortRestaurantModal}
      onClose={() => setShowSortRestaurantModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form className="modal-container">
        <strong>Sort By</strong>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="restaurant_id"
          name="radio-buttons-group"
          value={sortBy}
          onChange={(event) => handleChange(event.target.value)}
        >
          {SORTLIST.map((sort, sortIndex) => (
            <FormControlLabel
              key={sortIndex}
              value={sort.value}
              control={
                <Radio
                  sx={{
                    color: "#FF004D",
                    "&.Mui-checked": {
                      color: "#FF004D",
                    },
                  }}
                />
              }
              label={<header>{sort.label}</header>}
            />
          ))}
        </RadioGroup>
        <div className="modal-buttonContainer">
          <button
            className="save-button"
            onClick={() => {
              setShowSortRestaurantModal(false);
            }}
          >
            CANCEL
          </button>
          <button
            className="save-button"
            onClick={(event) => {
              handleSortRestaurants(
                event,
                sortBy,
                restaurantList,
                setRestaurantList
              );
              setShowSortRestaurantModal(false);
            }}
          >
            APPLY
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SortRestaurantModal;
