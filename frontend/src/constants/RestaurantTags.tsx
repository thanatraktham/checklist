const RestaurantTagMap: { [index: number]: string } = {
  1: "Buffet",
  2: "Cafe",
  3: "Casual Restaurant",
  4: "Fast Food",
  5: "Fine Dining",
  6: "Food Truck, Cart, Or Stand",
  7: "Hotel Restaurant",
  8: "Pub",
};

const RestaurantTags: { tag_id: number; tag_name: string }[] = [
  { tag_id: 1, tag_name: "Buffet" },
  { tag_id: 2, tag_name: "Cafe" },
  { tag_id: 3, tag_name: "Casual Restaurant" },
  { tag_id: 4, tag_name: "Fast Food" },
  { tag_id: 5, tag_name: "Fine Dining" },
  { tag_id: 6, tag_name: "Food Truck, Cart, Or Stand" },
  { tag_id: 7, tag_name: "Hotel Restaurant" },
  { tag_id: 8, tag_name: "Pub" },
];

export { RestaurantTagMap, RestaurantTags };
