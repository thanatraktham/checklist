async function handleSortRestaurants(
  event,
  sortBy,
  restaurantList,
  setRestaurantList
) {
  event.preventDefault();
  let tempRestaurantList = restaurantList;
  tempRestaurantList.sort((lhs, rhs) => {
    switch (sortBy) {
      case "restaurant_name":
        return rhs.restaurant_name > lhs.restaurant_name ? -1 : 1;
      case "rating":
        return rhs.rating - lhs.rating;
      case "visit_date":
        return rhs.visit_date > lhs.visit_date ? 1 : -1;
      default:
        return rhs.restaurnt_id - lhs.restaurant_id;
    }
  });
  setRestaurantList(tempRestaurantList);
}

export default handleSortRestaurants;
