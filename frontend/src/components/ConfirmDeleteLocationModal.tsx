import { Modal } from "@mui/material";
import React, { useContext } from "react";
import { LocationContext } from "../contexts/LocationContext";
import handleDeleteLocation from "../functions/handleDeleteLocation";

const ConfirmDeleteLocationModal = () => {
  const {
    location,
    locations,
    setLocations,
    showConfirmDeleteLocationModal,
    setShowConfirmDeleteLocationModal,
  } = useContext(LocationContext);
  return (
    <Modal
      className="modal-wrapper"
      open={showConfirmDeleteLocationModal}
      onClose={() => setShowConfirmDeleteLocationModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form className="modal-container">
        <strong>
          Delete Location
          <br />
          <b>{location?.location_name}</b> ?
        </strong>
        <div className="modal-buttonContainer">
          <button
            className="save-button"
            onClick={() => {
              setShowConfirmDeleteLocationModal(false);
            }}
          >
            CANCEL
          </button>
          <button
            className="save-button"
            onClick={(event) => {
              handleDeleteLocation(locations, setLocations, location);
              setShowConfirmDeleteLocationModal(false);
            }}
          >
            CONFIRM
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ConfirmDeleteLocationModal;
