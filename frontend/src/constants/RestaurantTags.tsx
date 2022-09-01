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

const RestaurantTags: { id: number; tag: string }[] = [
  { id: 1, tag: "Buffet" },
  { id: 2, tag: "Cafe" },
  { id: 3, tag: "Casual Restaurant" },
  { id: 4, tag: "Fast Food" },
  { id: 5, tag: "Fine Dining" },
  { id: 6, tag: "Food Truck, Cart, Or Stand" },
  { id: 7, tag: "Hotel Restaurant" },
  { id: 8, tag: "Pub" },
];

export { RestaurantTagMap, RestaurantTags };
