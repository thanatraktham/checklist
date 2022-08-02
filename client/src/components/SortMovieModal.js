import React, { useState } from "react";
import { FormControlLabel, Modal, Radio, RadioGroup } from "@mui/material";
import "./Modal.css";
import handleSortMovies from "../functions/handleSortMovies";

const SORTLIST = [
  { label: "movie name", value: "movie_name" },
  { label: "rating", value: "rating" },
  { label: "IMDBs", value: "imdb" },
  { label: "Rotten Tomatoes", value: "rotten_tomatoes" },
  { label: "watch date", value: "watch_date" },
];

const SortMovieModal = ({
  movieList,
  setMovieList,
  showSortMovieModal,
  setShowSortMovieModal,
}) => {
  const [sortBy, setSortBy] = useState("movie_id");

  const handleChange = (newSort) => {
    setSortBy(newSort);
  };

  return (
    <Modal
      className="modal-wrapper"
      open={showSortMovieModal}
      onClose={() => setShowSortMovieModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form className="modal-container">
        <strong>Sort By</strong>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="movie_id"
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
              setShowSortMovieModal(false);
            }}
          >
            CANCEL
          </button>
          <button
            className="save-button"
            onClick={(event) => {
              handleSortMovies(event, sortBy, movieList, setMovieList);
              setShowSortMovieModal(false);
            }}
          >
            APPLY
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SortMovieModal;
