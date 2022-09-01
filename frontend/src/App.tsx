import "./App.css";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { RestaurantContextProvider } from "./contexts/RestaurantContext";
import RootNavigation from "./routes/RootNavigation";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { LocationContextProvider } from "./contexts/LocationContext";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <LocationContextProvider>
        <RestaurantContextProvider>
          <div className="App">
            <RootNavigation />
          </div>
        </RestaurantContextProvider>
      </LocationContextProvider>
    </LocalizationProvider>
  );
}

export default App;
