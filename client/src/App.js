import "./App.css";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import RootNavigation from "./router/RootNavigation";

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <RootNavigation />
      </LocalizationProvider>
    </div>
  );
}

export default App;
