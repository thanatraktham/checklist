import { BrowserRouter, Route, Routes } from "react-router-dom";
import Location from "../pages/Location";
import Restaurant from "../pages/Restaurant";
import RestaurantDetail from "../pages/RestaurantDetail";

const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Restaurant />} />
        <Route path="/detail" element={<RestaurantDetail />} />
        <Route path="/location" element={<Location />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RootNavigation;
