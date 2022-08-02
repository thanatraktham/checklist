import React from "react";
import { Modal } from "@mui/material";
import "./Modal.css";
import handleDeleteMovie from "../functions/handleDeleteMovie";

const ConfirmDeleteMovieModal = ({
  movieList,
  setMovieList,
  showConfirmDeleteMovieModal,
  setShowConfirmDeleteMovieModal,
  selectedMovie,
}) => {
  return (
    <Modal
      className="modal-wrapper"
      open={showConfirmDeleteMovieModal}
      onClose={() => setShowConfirmDeleteMovieModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form className="modal-container">
        <strong>
          Delete Movie
          <br />
          <b>{selectedMovie?.movie_name}</b> ?
        </strong>
        <div className="modal-buttonContainer">
          <button
            className="save-button"
            onClick={() => {
              setShowConfirmDeleteMovieModal(false);
            }}
          >
            CANCEL
          </button>
          <button
            className="save-button"
            onClick={(event) => {
              handleDeleteMovie(event, movieList, setMovieList, selectedMovie);
              setShowConfirmDeleteMovieModal(false);
            }}
          >
            CONFIRM
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ConfirmDeleteMovieModal;
