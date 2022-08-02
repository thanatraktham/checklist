function getTheaterImageFromLocation(location_name) {
  switch (location_name) {
    case "Siam Paragon":
      return require("../assets/images/paragon cineplex.png");
    case "EmQuartier":
      return require("../assets/images/quatier cineart.png");
    case "Seacon Square Srinagarindra":
      return require("../assets/images/egv cinemas.png");
    default:
      break;
  }
}

export default getTheaterImageFromLocation;
