import { Delete, MoreVert, OpenInNew, Star } from "@mui/icons-material";
import { MenuItem, Popover } from "@mui/material";
import {
  forwardRef,
  ForwardRefRenderFunction,
  MouseEvent,
  useContext,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { RestaurantContext } from "../contexts/RestaurantContext";
import { IRestaurant } from "../interfaces/IRestaurant";

const RestaurantCard: ForwardRefRenderFunction<
  HTMLInputElement,
  IRestaurant
> = (props: IRestaurant, ref) => {
  const navigate = useNavigate();
  const {
    selectedRestaurant,
    setSelectedRestaurant,
    setShowConfirmDeleteRestaurantModal,
  } = useContext(RestaurantContext);
  const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);
  const openPopover = Boolean(anchorEl);
  const cardId = openPopover ? "simple-popover" : undefined;
  function handleClickRestaurant(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    navigate(`/detail`, {
      state: {
        restaurant: props,
      },
    });
  }
  function handleClickMoreVert(event: MouseEvent<SVGSVGElement>) {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedRestaurant(props);
  }
  function handleClosePopover() {
    setAnchorEl(null);
  }
  return (
    <div ref={ref} className="restaurant-cardContainer">
      <div
        className="restaurant-card"
        onClick={(event) => handleClickRestaurant(event)}
      >
        <img src={props.img_url} alt="not found" />
        <div className="restaurant-resHeader">
          <b>{props.restaurant_name}</b>
          <MoreVert
            aria-describedby={cardId}
            className="icons"
            onClick={(event) => handleClickMoreVert(event)}
          />
        </div>
        <div className="restaurant-resInfo">
          <p style={{ maxWidth: "50%" }}>{props.location_name}</p>
          <p>|</p>
          <p>{new Date(props.visit_date).toString().substring(4, 15)}</p>
          <Star style={{ marginLeft: "5px", color: "#FF004D" }} />
          <p>{props.rating}</p>
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
};

export default forwardRef(RestaurantCard);
