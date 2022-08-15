import React, { useContext, useEffect, useState } from "react";
import "./Movie.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AddCircle, FilterList, Sort } from "@mui/icons-material";
import MovieCard from "../components/MovieCard";
import queryMovies from "../functions/queryMovies";
import SortMovieModal from "../components/SortMovieModal";
import FlipMove from "react-flip-move";
import FilterMovieModal from "../components/FilterMovieModal";
import ConfirmDeleteMovieModal from "../components/ConfirmDeleteMovie";
import { MovieContext } from "../contexts/MovieContext";

const Movie = () => {
  const navigate = useNavigate();
  const { movies, setMovies } = useContext(MovieContext);
  const [selectedMovie, setSelectedMovie] = useState();
  const [showSortMovieModal, setShowSortMovieModal] = useState(false);
  const [showFilterMovieModal, setShowFilterMovieModal] = useState(false);
  const [showConfirmDeleteMovieModal, setShowConfirmDeleteMovieModal] =
    useState(false);

  useEffect(() => {
    queryMovies(setMovies);
  }, []);

  return (
    <div className="movie-container">
      <Navbar>MOVIE CHECKLIST</Navbar>
      <div className="movie-newRes">
        <div />
        <b>NEW</b>
        <AddCircle
          className="icons"
          onClick={() => navigate("/movie-detail")}
        />
        <div>
          <div
            className="iconsButton"
            onClick={() => {
              setShowSortMovieModal(true);
            }}
          >
            <p>Sort</p>
            <Sort />
          </div>
          <div
            className="iconsButton"
            onClick={() => {
              setShowFilterMovieModal(true);
            }}
          >
            <p>Filter</p>
            <FilterList />
          </div>
        </div>
      </div>
      <FlipMove typeName="div" className="movie-cardList">
        {movies &&
          movies.map((card) => (
            <MovieCard
              key={card.movie_id}
              card={card}
              setSelectedMovie={setSelectedMovie}
              setShowConfirmDeleteMovieModal={setShowConfirmDeleteMovieModal}
            />
          ))}
        {!movies && <div className="movie-card-loading" />}
      </FlipMove>
      <SortMovieModal
        movies={movies}
        setMovies={setMovies}
        showSortMovieModal={showSortMovieModal}
        setShowSortMovieModal={setShowSortMovieModal}
      />
      <FilterMovieModal
        setMovies={setMovies}
        showFilterMovieModal={showFilterMovieModal}
        setShowFilterMovieModal={setShowFilterMovieModal}
      />
      <ConfirmDeleteMovieModal
        movies={movies}
        setMovies={setMovies}
        showConfirmDeleteMovieModal={showConfirmDeleteMovieModal}
        setShowConfirmDeleteMovieModal={setShowConfirmDeleteMovieModal}
        selectedMovie={selectedMovie}
      />
    </div>
  );
};

export default Movie;
