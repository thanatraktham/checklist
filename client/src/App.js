import "./App.css";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import RootNavigation from "./router/RootNavigation";
import { RestaurantContextProvider } from "./contexts/RestaurantContext";
import { MovieContextProvider } from "./contexts/MovieContext";

function App() {
  return (
    <RestaurantContextProvider>
      <MovieContextProvider>
        <div className="App">
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <RootNavigation />
          </LocalizationProvider>
        </div>
      </MovieContextProvider>
    </RestaurantContextProvider>
  );
}

export default App;
