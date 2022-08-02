import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "../pages/About";
import Restaurant from "../pages/Restaurant";
import Location from "../pages/Location";
import RestaurantDetail from "../pages/RestaurantDetail";
import Movie from "../pages/Movie";
import MovieDetail from "../pages/MovieDetail";

const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Restaurant />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/detail" element={<RestaurantDetail />} />
        <Route path="/detail/:restaurant_id" element={<RestaurantDetail />} />
        <Route path="/movie-detail" element={<MovieDetail />} />
        <Route path="/movie-detail/:movie_id" element={<MovieDetail />} />
        <Route path="/locations" element={<Location />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RootNavigation;
