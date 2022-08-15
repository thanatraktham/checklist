import { Delete, MoreVert, Star } from "@mui/icons-material";
import { MenuItem, Popover, Tooltip } from "@mui/material";
import React, { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import getTheaterImageFromLocation from "../functions/getTheaterImageFromLocation";

const MovieCard = forwardRef((props, ref) => {
  const { card, setSelectedMovie, setShowConfirmDeleteMovieModal } = {
    ...props,
  };
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const openPopover = Boolean(anchorEl);
  const cardId = openPopover ? "simple-popover" : undefined;

  const handleClickMoreVert = (event, card) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedMovie(card);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  return (
    <div ref={ref} className="movie-cardContainer">
      <div
        className="movie-card"
        onClick={() =>
          navigate(`/movie-detail`, {
            state: {
              movie: card,
            },
          })
        }
      >
        <img src={card.movie_img_url} alt="not found" />
        <div className="movie-resHeader">
          <b>{card.movie_name}</b>
          <MoreVert
            aria-describedby={cardId}
            className="icons"
            onClick={(event) => handleClickMoreVert(event, card)}
          />
        </div>
        <div className="movie-resInfo">
          <Tooltip title={"Paragon Cineplex"}>
            <img
              src={getTheaterImageFromLocation(card.location_name)}
              alt="logo not found"
            />
          </Tooltip>
          <p>|</p>
          <p>{new Date(card.watch_date).toString().substring(4, 15)}</p>
          <Tooltip
            title={`IMDBs: ${card.imdb}, Rotten Tomatoes: ${card.rotten_tomatoes}`}
          >
            <Star style={{ marginLeft: "5px", color: "#FF004D" }} />
          </Tooltip>
          <p>{card.rating}</p>
        </div>
      </div>

      <Popover
        id={cardId}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={() => handleClosePopover()}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem
          onClick={() => {
            setShowConfirmDeleteMovieModal(true);
            handleClosePopover();
          }}
        >
          <Delete style={{ marginRight: "5px" }} />
          <p>Delete</p>
        </MenuItem>
      </Popover>
    </div>
  );
});

export default MovieCard;
