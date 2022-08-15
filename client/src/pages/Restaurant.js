import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Restaurant.css";
import { AddCircle, FilterList, Sort } from "@mui/icons-material";
import queryRestaurants from "../functions/queryRestaurants";
import Navbar from "../components/Navbar";
import SortRestaurantModal from "../components/SortRestaurantModal";
import FilterRestaurantModal from "../components/FilterRestaurantModal";
import ConfirmDeleteRestaurantModal from "../components/ConfirmDeleteRestaurantModal";
import RestaurantCard from "../components/RestaurantCard";
import FlipMove from "react-flip-move";
import { RestaurantContext } from "../contexts/RestaurantContext";

const Restaurant = () => {
  const navigate = useNavigate();
  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  const [selectedRestaurant, setSelectedRestaurant] = useState();
  const [showSortRestaurantModal, setShowSortRestaurantModal] = useState(false);
  const [showFilterRestaurantModal, setShowFilterRestaurantModal] =
    useState(false);
  const [
    showConfirmDeleteRestaurantModal,
    setShowConfirmDeleteRestaurantModal,
  ] = useState(false);

  useEffect(() => {
    queryRestaurants(setRestaurants);
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
      <FlipMove typeName="div" className="restaurant-cardList">
        {restaurants &&
          restaurants.map((card) => (
            <RestaurantCard
              key={card.img_url}
              card={card}
              selectedRestaurant={selectedRestaurant}
              setSelectedRestaurant={setSelectedRestaurant}
              setShowConfirmDeleteRestaurantModal={
                setShowConfirmDeleteRestaurantModal
              }
            />
          ))}
        {!restaurants && <div className="restaurant-card-loading" />}
      </FlipMove>
      <SortRestaurantModal
        showSortRestaurantModal={showSortRestaurantModal}
        setShowSortRestaurantModal={setShowSortRestaurantModal}
      />
      <FilterRestaurantModal
        showFilterRestaurantModal={showFilterRestaurantModal}
        setShowFilterRestaurantModal={setShowFilterRestaurantModal}
      />
      <ConfirmDeleteRestaurantModal
        showConfirmDeleteRestaurantModal={showConfirmDeleteRestaurantModal}
        setShowConfirmDeleteRestaurantModal={
          setShowConfirmDeleteRestaurantModal
        }
        selectedRestaurant={selectedRestaurant}
      />
    </div>
  );
};

export default Restaurant;
