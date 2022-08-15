import { createContext, useState } from "react";

export const MovieContext = createContext();

export const MovieContextProvider = (props) => {
  const [movies, setMovies] = useState();
  return (
    <MovieContext.Provider value={{ movies, setMovies }}>
      {props.children}
    </MovieContext.Provider>
  );
};
