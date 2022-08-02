import React, { useEffect, useState } from "react";
import "./Movie.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AddCircle, FilterList, Sort } from "@mui/icons-material";
import MovieCard from "../components/MovieCard";
import queryMovieList from "../functions/queryMovieList";
import SortMovieModal from "../components/SortMovieModal";
import FlipMove from "react-flip-move";
import FilterMovieModal from "../components/FilterMovieModal";
import ConfirmDeleteMovieModal from "../components/ConfirmDeleteMovie";

const Movie = () => {
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState();
  const [selectedMovie, setSelectedMovie] = useState();
  const [showSortMovieModal, setShowSortMovieModal] = useState(false);
  const [showFilterMovieModal, setShowFilterMovieModal] = useState(false);
  const [showConfirmDeleteMovieModal, setShowConfirmDeleteMovieModal] =
    useState(false);

  useEffect(() => {
    queryMovieList(setMovieList);
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
        {movieList &&
          movieList.map((card) => (
            <MovieCard
              key={card.movie_id}
              card={card}
              setSelectedMovie={setSelectedMovie}
              setShowConfirmDeleteMovieModal={setShowConfirmDeleteMovieModal}
            />
          ))}
        {!movieList && <div className="movie-card-loading" />}
      </FlipMove>
      <SortMovieModal
        movieList={movieList}
        setMovieList={setMovieList}
        showSortMovieModal={showSortMovieModal}
        setShowSortMovieModal={setShowSortMovieModal}
      />
      <FilterMovieModal
        setMovieList={setMovieList}
        showFilterMovieModal={showFilterMovieModal}
        setShowFilterMovieModal={setShowFilterMovieModal}
      />
      <ConfirmDeleteMovieModal
        movieList={movieList}
        setMovieList={setMovieList}
        showConfirmDeleteMovieModal={showConfirmDeleteMovieModal}
        setShowConfirmDeleteMovieModal={setShowConfirmDeleteMovieModal}
        selectedMovie={selectedMovie}
      />
    </div>
  );
};

export default Movie;
