import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Map, Save, Star, StarBorder } from "@mui/icons-material";
import "./RestaurantDetail.css";
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
import handleAddRestaurant from "../functions/handleAddRestaurant";
import queryRestaurantById from "../functions/queryRestaurantById";
import handleUpdateRestaurant from "../functions/handleUpdateRestaurant";
import queryLocationList from "../functions/queryLocationList";
import handleAddLocation from "../functions/handleAddLocation";
import Footerbar from "../components/Footerbar";
import getSourceFromIframeText from "../functions/getSourceFromIframeText";
import AlertBox from "../components/AlertBox";

const RestaurantDetail = () => {
  const { restaurant_id } = useParams();
  const [restaurant, setRestaurant] = useState();
  const [locationList, setLocationList] = useState([]);
  const [reload, setReload] = useState(false);
  const [hover, setHover] = useState(-1);
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("info");

  const filter = createFilterOptions();
  const labels = {
    0: "",
    0.5: "1",
    1: "2",
    1.5: "3",
    2: "4",
    2.5: "5",
    3: "6",
    3.5: "7",
    4: "8",
    4.5: "9",
    5: "10",
  };

  function handleUpdateName(newName) {
    let tempRestaurant = restaurant;
    tempRestaurant.restaurant_name = newName;
    setRestaurant(tempRestaurant);
  }
  function handleUpdateVisitDate(newDate) {
    let tempRestaurant = restaurant;
    tempRestaurant.visit_date = new Date(newDate);
    setRestaurant(tempRestaurant);
    setReload(!reload);
  }
  function handleUpdateImgUrl(newImgUrl) {
    let tempRestaurant = restaurant;
    tempRestaurant.img_url = newImgUrl;
    setRestaurant(tempRestaurant);
  }
  function handleUpdateExistedLocation(newLocation) {
    let tempRestaurant = restaurant;
    tempRestaurant.location_id = newLocation.location_id;
    tempRestaurant.location_name = newLocation.location_name;
    setRestaurant(tempRestaurant);
    setReload(!reload);
  }
  function handleUpdateGoogleMapUrl(newGoogleMapUrl) {
    let tempRestaurant = restaurant;
    tempRestaurant.google_map_url = newGoogleMapUrl;
    setRestaurant(tempRestaurant);
  }
  function handleUpdateLocationUrl(newLocationUrl) {
    let tempRestaurant = restaurant;
    tempRestaurant.restaurant_url = newLocationUrl;
    setRestaurant(tempRestaurant);
  }
  function handleUpdateRating(newrating) {
    let tempRestaurant = restaurant;
    tempRestaurant.rating = newrating * 2;
    setRestaurant(tempRestaurant);
  }
  async function handleSubmitButtonClick(event, restaurant_id) {
    setShowAlert(true);
    setAlertStatus("info");
    try {
      if (restaurant_id) {
        await handleUpdateRestaurant(event, restaurant);
      } else {
        await handleAddRestaurant(event, restaurant);
      }
      setAlertStatus("success");
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } catch (error) {
      setAlertStatus("error");
    }
  }

  if (restaurant) {
    return (
      <div className="detail-container">
        <div className="detail-alert-container">
          <AlertBox
            showAlert={showAlert}
            setShowAlert={setShowAlert}
            alertStatus={alertStatus}
            setAlertStatus={setAlertStatus}
          />
        </div>
        <Navbar>{`${restaurant_id ? "EDIT" : "NEW"} RESTAURANT`}</Navbar>
        <form className="detail-formContainer">
          <div className="detail-form">
            <Button onClick={() => console.log(restaurant)}>
              see restaurant
            </Button>
            <div>
              <BoxHeader>ชื่อร้าน</BoxHeader>
              <TextInput
                fullWidth
                defaultValue={restaurant.restaurant_name}
                onChange={(event) => handleUpdateName(event.target.value)}
              />
            </div>
            <div>
              <BoxHeader>วัน เดือน ปี</BoxHeader>
              <DatePicker
                value={restaurant.visit_date}
                onChange={(newValue) => handleUpdateVisitDate(newValue)}
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
              <BoxHeader>รูปร้านอาหาร</BoxHeader>
              <TextInput
                fullWidth
                defaultValue={restaurant.img_url}
                onChange={(event) => handleUpdateImgUrl(event.target.value)}
              />
            </div>
            <div>
              <BoxHeader>ที่อยู่ร้าน</BoxHeader>
              {/* <TextInput
                fullWidth
                defaultValue={restaurant.location_name}
                onChange={(event) => handleUpdateLocation(event.target.value)}
              /> */}
              <Autocomplete
                value={restaurant.location_name}
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    handleUpdateExistedLocation(newValue);
                  } else if (newValue && newValue.inputValue) {
                    try {
                      handleAddLocation(
                        event,
                        locationList,
                        setLocationList,
                        newValue.inputValue
                      );
                    } catch (error) {
                      console.error(error.message);
                    }
                  } else if (newValue) {
                    handleUpdateExistedLocation(newValue);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  const { inputValue } = params;
                  // Suggest the creation of a new value
                  const isExisting = options.some(
                    (option) => inputValue === option.location_name
                  );
                  if (inputValue !== "" && !isExisting) {
                    filtered.push({
                      inputValue,
                      location_name: `Add "${inputValue}"`,
                    });
                  }

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
                  <li {...props}>{option.location_name}</li>
                )}
                freeSolo
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
              <BoxHeader>Google Map Url</BoxHeader>
              <TextInput
                fullWidth
                defaultValue={restaurant.google_map_url}
                onChange={(event) =>
                  handleUpdateGoogleMapUrl(event.target.value)
                }
              />
            </div>
            <div>
              <BoxHeader>Embedded Map</BoxHeader>
              <div style={{ display: "flex" }}>
                <TextInput
                  fullWidth
                  defaultValue={restaurant.restaurant_url}
                  onChange={(event) =>
                    handleUpdateLocationUrl(event.target.value)
                  }
                />
                <button
                  className="detail-convert-button"
                  onClick={(event) => {
                    event.preventDefault();
                    handleUpdateLocationUrl(
                      getSourceFromIframeText(restaurant.restaurant_url)
                    );
                    setReload(!reload);
                  }}
                >
                  <Map />
                </button>
              </div>
              {restaurant.restaurant_url && (
                <iframe
                  src={restaurant.restaurant_url}
                  title="unique-22"
                  width="100%"
                  height="500"
                  frameBorder="0"
                  style={{ maxWidth: "500px", marginTop: 30, border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  aria-hidden="false"
                  tabIndex="0"
                />
              )}
            </div>
            <div>
              <BoxHeader>Rating</BoxHeader>
              <span className="detail-rating">
                <span>
                  <Rating
                    name="unique-rating"
                    value={restaurant.rating / 2.0}
                    precision={0.5}
                    sx={{ fontSize: 48 }}
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
                {restaurant.rating !== null && (
                  <h2>
                    {labels[hover !== -1 ? hover : restaurant.rating / 2.0]}
                  </h2>
                )}
              </span>
            </div>
          </div>
        </form>
        <Footerbar
          submitButton={
            <button
              className="save-button"
              style={{ marginRight: 20 }}
              onClick={(event) => handleSubmitButtonClick(event, restaurant_id)}
            >
              <div>
                <Save sx={{ position: "relative", top: "1px" }} />
              </div>
              <span>{restaurant_id ? "UPDATE" : "SAVE"}</span>
            </button>
          }
        />
      </div>
    );
  } else {
    if (restaurant_id) {
      queryRestaurantById(restaurant_id, setRestaurant);
    } else {
      setRestaurant({
        img_url: "",
        restaurant_name: "",
        location_id: -1,
        location_name: "",
        restaurant_url: "",
        rating: -1,
        visit_date: new Date(),
      });
    }
    queryLocationList(setLocationList);
    return <div>Loading . . .</div>;
  }
};

export default RestaurantDetail;
