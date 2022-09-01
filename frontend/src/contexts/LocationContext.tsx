import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { ILocation } from "../interfaces/ILocation";

type Props = {
  children: React.ReactNode;
};

type LocationContextType = {
  locations: ILocation[];
  setLocations: Dispatch<SetStateAction<ILocation[]>>;
  location: ILocation;
  setLocation: Dispatch<SetStateAction<ILocation>>;
  showSortLocationModal: boolean;
  setShowSortLocationModal: Dispatch<SetStateAction<boolean>>;
  showConfirmDeleteLocationModal: boolean;
  setShowConfirmDeleteLocationModal: Dispatch<SetStateAction<boolean>>;
};

const LocationContextState = {
  locations: [],
  setLocations: () => {},
  location: { location_id: -1, location_name: "" },
  setLocation: () => {},
  showSortLocationModal: false,
  setShowSortLocationModal: () => {},
  showConfirmDeleteLocationModal: false,
  setShowConfirmDeleteLocationModal: () => {},
};

export const LocationContext =
  createContext<LocationContextType>(LocationContextState);

export const LocationContextProvider = ({ children }: Props) => {
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [location, setLocation] = useState<ILocation>({
    location_id: -1,
    location_name: "",
  });
  const [showSortLocationModal, setShowSortLocationModal] =
    useState<boolean>(false);
  const [showConfirmDeleteLocationModal, setShowConfirmDeleteLocationModal] =
    useState<boolean>(false);
  return (
    <LocationContext.Provider
      value={{
        locations,
        setLocations,
        location,
        setLocation,
        showSortLocationModal,
        setShowSortLocationModal,
        showConfirmDeleteLocationModal,
        setShowConfirmDeleteLocationModal,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
