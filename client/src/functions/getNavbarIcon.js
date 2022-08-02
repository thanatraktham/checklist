import { Info, LocationOn, Restaurant, Theaters } from "@mui/icons-material";

function getNavbarIcon(pathName) {
  switch (pathName) {
    case "Restaurant":
      return <Restaurant style={{ marginRight: 10 }} />;
    case "Location":
      return <LocationOn style={{ marginRight: 10 }} />;
    case "About Me":
      return <Info style={{ marginRight: 10 }} />;
    case "Movies":
      return <Theaters style={{ marginRight: 10 }} />;
    default:
      break;
  }
}

export default getNavbarIcon;
