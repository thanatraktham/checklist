import { Delete, MoreVert, OpenInNew, Star } from "@mui/icons-material";
import { MenuItem, Popover } from "@mui/material";
import React, { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const RestaurantCard = forwardRef((props, ref) => {
  const {
    card,
    selectedRestaurant,
    setSelectedRestaurant,
    setShowConfirmDeleteRestaurantModal,
  } = { ...props };
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const openPopover = Boolean(anchorEl);
  const cardId = openPopover ? "simple-popover" : undefined;

  const handleClickMoreVert = (event, card) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedRestaurant(card);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  return (
    <div ref={ref} className="restaurant-cardContainer">
      <div
        className="restaurant-card"
        onClick={() =>
          navigate(`/detail`, {
            state: {
              restaurant: card,
            },
          })
        }
      >
        <img src={card.img_url} alt="not found" />
        <div className="restaurant-resHeader">
          <b>{card.restaurant_name}</b>
          <MoreVert
            aria-describedby={cardId}
            className="icons"
            onClick={(event) => handleClickMoreVert(event, card)}
          />
        </div>
        <div className="restaurant-resInfo">
          <p style={{ maxWidth: "50%" }}>{card.location_name}</p>
          <p>|</p>
          <p>{new Date(card.visit_date).toString().substring(4, 15)}</p>
          <Star style={{ marginLeft: "5px", color: "#FF004D" }} />
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
            setShowConfirmDeleteRestaurantModal(true);
            handleClosePopover();
          }}
        >
          <Delete style={{ marginRight: "5px" }} />
          <p>Delete</p>
        </MenuItem>
        <MenuItem
          onClick={() => {
            window.open(selectedRestaurant?.google_map_url, "_blank");
            handleClosePopover();
          }}
        >
          <OpenInNew style={{ marginRight: "5px" }} />
          <p>Open In Google Map</p>
        </MenuItem>
      </Popover>
    </div>
  );
});

export default RestaurantCard;
