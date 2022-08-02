import { Modal } from "@mui/material";
import React from "react";
import handleDeleteLocation from "../functions/handleDeleteLocation";

const ConfirmDeleteLocationModal = ({
  locationList,
  setLocationList,
  showConfirmDeleteLocationModal,
  setShowConfirmDeleteLocationModal,
  selectedLocation,
}) => {
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
          <b>{selectedLocation?.location_name}</b> ?
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
              handleDeleteLocation(
                event,
                locationList,
                setLocationList,
                selectedLocation
              );
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
