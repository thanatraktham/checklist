import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Save, Star, StarBorder } from "@mui/icons-material";
import "./MovieDetail.css";
import Navbar from "../components/Navbar";
import BoxHeader from "../components/BoxHeader";
import { TextFieldInput, TextInput } from "../styles/InputStyles";
import {
  Autocomplete,
  Button,
  createFilterOptions,
  Rating,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import handleAddLocation from "../functions/handleAddLocation";
import Footerbar from "../components/Footerbar";
import handleUpdateMovie from "../functions/handleUpdateMovie";
import handleAddMovie from "../functions/handleAddMovie";
import queryLocationList from "../functions/queryLocationList";
import AlertBox from "../components/AlertBox";
import { RatingLabel } from "../constants/RatingLabel";

const MovieDetail = () => {
  const [movie, setMovie] = useState(useLocation().state?.movie);
  const [locationList, setLocationList] = useState([]);
  const [reload, setReload] = useState(false);
  const [hover, setHover] = useState(-1);
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("info");

  const filter = createFilterOptions();

  function handleUpdateName(newName) {
    let tempMovie = movie;
    tempMovie.movie_name = newName;
    setMovie(tempMovie);
  }
  function handleUpdateWatchDate(newDate) {
    let tempMovie = movie;
    tempMovie.watch_date = new Date(newDate);
    setMovie(tempMovie);
    setReload(!reload);
  }
  function handleUpdateImgUrl(newImgUrl) {
    let tempMovie = movie;
    tempMovie.movie_img_url = newImgUrl;
    setMovie(tempMovie);
  }
  function handleUpdateExistedLocation(newLocation) {
    let tempMovie = movie;
    tempMovie.location_id = newLocation.location_id;
    tempMovie.location_name = newLocation.location_name;
    setMovie(tempMovie);
    setReload(!reload);
  }
  function handleUpdateImdb(score) {
    let tempMovie = movie;
    tempMovie.imdb = parseFloat(score, 10);
    setMovie(tempMovie);
  }
  function handleUpdateRottenTomatoes(score) {
    let tempMovie = movie;
    tempMovie.rotten_tomatoes = parseFloat(score, 10);
    setMovie(tempMovie);
  }
  function handleUpdateRating(newrating) {
    let tempMovie = movie;
    tempMovie.rating = newrating;
    setMovie(tempMovie);
  }
  async function handleSubmitButtonClick(event, movie_id) {
    setShowAlert(true);
    setAlertStatus("info");
    try {
      if (movie_id) {
        await handleUpdateMovie(event, movie);
      } else {
        await handleAddMovie(event, movie);
      }
      setAlertStatus("success");
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } catch (error) {
      setAlertStatus("error");
    }
  }

  if (movie) {
    return (
      <div className="movie-container">
        <div className="detail-alert-container">
          <AlertBox
            showAlert={showAlert}
            setShowAlert={setShowAlert}
            alertStatus={alertStatus}
            setAlertStatus={setAlertStatus}
          />
        </div>
        <Navbar>{`${movie.movie_id ? "EDIT" : "NEW"} MOVIE`}</Navbar>
        <form className="movie-formContainer">
          <div className="movie-form">
            <Button onClick={() => console.log(movie)}>see movie</Button>
            <div>
              <BoxHeader>????????????????????????</BoxHeader>
              <TextInput
                fullWidth
                defaultValue={movie.movie_name}
                onChange={(event) => handleUpdateName(event.target.value)}
              />
            </div>
            <div>
              <BoxHeader>????????? ??????????????? ??????</BoxHeader>
              <DatePicker
                value={movie.watch_date}
                onChange={(newValue) => handleUpdateWatchDate(newValue)}
                renderInput={(params) => (
                  <TextFieldInput
                    fullWidth
                    sx={{
                      svg: { color: "black" },
                      input: {
                        color: "black",
                        fontFamily: "Prompt",
                      },
                    }}
                    {...params}
                  />
                )}
              />
            </div>
            <div>
              <BoxHeader>Poster ????????????</BoxHeader>
              <TextInput
                fullWidth
                defaultValue={movie.movie_img_url}
                onChange={(event) => handleUpdateImgUrl(event.target.value)}
              />
            </div>
            <div>
              <BoxHeader>????????????????????????????????????</BoxHeader>
              <Autocomplete
                value={movie.location_name}
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    handleUpdateExistedLocation(newValue);
                  } else if (newValue && newValue.inputValue) {
                    handleAddLocation(
                      event,
                      locationList,
                      setLocationList,
                      newValue.inputValue
                    );
                  } else if (newValue) {
                    handleUpdateExistedLocation(newValue);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                options={locationList}
                getOptionLabel={(option) => {
                  // Value selected with enter, right from the input
                  if (typeof option === "string") {
                    return option;
                  }
                  // Add "xxx" option created dynamically
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  // Regular option
                  return option.location_name;
                }}
                renderOption={(props, option) => (
                  <li {...props}>
                    {`${option.location_name} (${option.theater})`}
                  </li>
                )}
                renderInput={(params) => (
                  <TextFieldInput
                    fullWidth
                    size="small"
                    sx={{
                      svg: { color: "black" },
                      input: {
                        position: "relative",
                        top: -8,
                        color: "black",
                        fontFamily: "Prompt",
                      },
                    }}
                    {...params}
                  />
                )}
              />
            </div>
            <div>
              <BoxHeader>imdb</BoxHeader>
              <TextInput
                fullWidth
                type="number"
                defaultValue={movie.imdb}
                onChange={(event) => handleUpdateImdb(event.target.value)}
              />
            </div>
            <div>
              <BoxHeader>rotten_tomatoes</BoxHeader>
              <TextInput
                fullWidth
                type="number"
                defaultValue={movie.rotten_tomatoes}
                onChange={(event) =>
                  handleUpdateRottenTomatoes(event.target.value)
                }
              />
            </div>
            <div>
              <BoxHeader>Rating</BoxHeader>
              <span className="movie-rating">
                <span>
                  <Rating
                    name="unique-rating"
                    value={movie.rating}
                    max={10}
                    sx={{ fontSize: "3vh" }}
                    onChange={(event, newValue) => {
                      handleUpdateRating(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    icon={
                      <Star style={{ color: "#FF004D" }} fontSize="inherit" />
                    }
                    emptyIcon={
                      <StarBorder
                        style={{ opacity: 0.5, color: "white" }}
                        fontSize="inherit"
                      />
                    }
                  />
                </span>
                <h2>{RatingLabel[hover !== -1 ? hover : movie.rating]}</h2>
              </span>
            </div>
          </div>
        </form>
        <Footerbar
          submitButton={
            <button
              className="save-button"
              style={{ marginRight: 20 }}
              onClick={(event) =>
                handleSubmitButtonClick(event, movie.movie_id)
              }
            >
              <div>
                <Save sx={{ position: "relative", top: "1px" }} />
              </div>
              <span>{movie.movie_id ? "UPDATE" : "SAVE"}</span>
            </button>
          }
        />
      </div>
    );
  } else {
    setMovie({
      movie_name: "",
      movie_img_url: "",
      location_id: -1,
      imdb: 0,
      rotten_tomatoes: 0,
      rating: 0,
      watch_date: new Date(),
    });
    queryLocationList(setLocationList, true);
  }
};

export default MovieDetail;
