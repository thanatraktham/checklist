import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { IRestaurant } from "../interfaces/IRestaurant";

type Props = {
  children: React.ReactNode;
};
type RestaurantContextType = {
  restaurants: IRestaurant[];
  setRestaurants: Dispatch<SetStateAction<IRestaurant[]>>;
  selectedRestaurant: IRestaurant | null;
  setSelectedRestaurant: Dispatch<SetStateAction<IRestaurant | null>>;
  showSortRestaurantModal: boolean;
  setShowSortRestaurantModal: Dispatch<SetStateAction<boolean>>;
  showFilterRestaurantModal: boolean;
  setShowFilterRestaurantModal: Dispatch<SetStateAction<boolean>>;
  showConfirmDeleteRestaurantModal: boolean;
  setShowConfirmDeleteRestaurantModal: Dispatch<SetStateAction<boolean>>;
};

const RestaurantContextState = {
  restaurants: [],
  setRestaurants: () => {},
  selectedRestaurant: null,
  setSelectedRestaurant: () => {},
  showSortRestaurantModal: false,
  setShowSortRestaurantModal: () => {},
  showFilterRestaurantModal: false,
  setShowFilterRestaurantModal: () => {},
  showConfirmDeleteRestaurantModal: false,
  setShowConfirmDeleteRestaurantModal: () => {},
};

export const RestaurantContext = createContext<RestaurantContextType>(
  RestaurantContextState
);

export const RestaurantContextProvider = ({ children }: Props) => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<IRestaurant | null>(null);
  const [showSortRestaurantModal, setShowSortRestaurantModal] =
    useState<boolean>(false);
  const [showFilterRestaurantModal, setShowFilterRestaurantModal] =
    useState<boolean>(false);
  const [
    showConfirmDeleteRestaurantModal,
    setShowConfirmDeleteRestaurantModal,
  ] = useState<boolean>(false);
  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        setRestaurants,
        selectedRestaurant,
        setSelectedRestaurant,
        showSortRestaurantModal,
        setShowSortRestaurantModal,
        showFilterRestaurantModal,
        setShowFilterRestaurantModal,
        showConfirmDeleteRestaurantModal,
        setShowConfirmDeleteRestaurantModal,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};
