import { useContext, useEffect } from "react";
import "./Restaurant.css";
import { AddCircle, FilterList, Sort } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import FlipMove from "react-flip-move";
import RestaurantCard from "../components/RestaurantCard";
import Navbar from "../components/Navbar";
import { RestaurantContext } from "../contexts/RestaurantContext";
import SortRestaurantModal from "../components/SortRestaurantModal";
import FilterRestaurantModal from "../components/FilterRestaurantModal";
import ConfirmDeleteRestaurantModal from "../components/ConfirmDeleteRestaurantModal";
import queryRestaurants from "../functions/queryRestaurants";

const Restaurant = () => {
  const navigate = useNavigate();
  const {
    restaurants,
    setRestaurants,
    setShowSortRestaurantModal,
    setShowFilterRestaurantModal,
  } = useContext(RestaurantContext);

  useEffect(() => {
    let subscribed = true;
    queryRestaurants().then((response) => {
      if (subscribed && response) {
        setRestaurants(response.data);
      }
    });

    return () => {
      subscribed = false;
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="restaurant-container">
      <Navbar>RESTAURANT CHECKLIST</Navbar>
      <div className="restaurant-newRes">
        <div />
        <b>NEW</b>
        <AddCircle className="icons" onClick={() => navigate("/detail")} />
        <div>
          <div
            className="iconsButton"
            onClick={() => {
              setShowSortRestaurantModal(true);
            }}
          >
            <p>Sort</p>
            <Sort />
          </div>
          <div
            className="iconsButton"
            onClick={() => {
              setShowFilterRestaurantModal(true);
            }}
          >
            <p>Filter</p>
            <FilterList />
          </div>
        </div>
      </div>
      <div>
        <FlipMove typeName="div" className="restaurant-cardList">
          {restaurants &&
            restaurants.map((card) => (
              <RestaurantCard
                key={card.google_map_url}
                {...card}
                // selectedRestaurant={selectedRestaurant}
                // setSelectedRestaurant={setSelectedRestaurant}
                // setShowConfirmDeleteRestaurantModal={
                //   setShowConfirmDeleteRestaurantModal
                // }
              />
            ))}
          {!restaurants && <div className="restaurant-card-loading" />}
        </FlipMove>
      </div>
      <SortRestaurantModal />
      <FilterRestaurantModal />
      <ConfirmDeleteRestaurantModal />
    </div>
  );
};

export default Restaurant;
