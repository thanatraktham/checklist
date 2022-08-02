import React from "react";
import { Modal } from "@mui/material";
import "./Modal.css";
import handleDeleteRestaurant from "../functions/handleDeleteRestaurant";

const ConfirmDeleteRestaurantModal = ({
  restaurantList,
  setRestaurantList,
  showConfirmDeleteRestaurantModal,
  setShowConfirmDeleteRestaurantModal,
  selectedRestaurant,
}) => {
  return (
    <Modal
      className="modal-wrapper"
      open={showConfirmDeleteRestaurantModal}
      onClose={() => setShowConfirmDeleteRestaurantModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form className="modal-container">
        <strong>
          Delete Restaurant
          <br />
          <b>{selectedRestaurant?.restaurant_name}</b> ?
        </strong>
        <div className="modal-buttonContainer">
          <button
            className="save-button"
            onClick={() => {
              setShowConfirmDeleteRestaurantModal(false);
            }}
          >
            CANCEL
          </button>
          <button
            className="save-button"
            onClick={(event) => {
              handleDeleteRestaurant(
                event,
                restaurantList,
                setRestaurantList,
                selectedRestaurant
              );
              setShowConfirmDeleteRestaurantModal(false);
            }}
          >
            CONFIRM
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ConfirmDeleteRestaurantModal;
