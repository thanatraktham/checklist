import { FC, MouseEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Map, Save, Star, StarBorder } from "@mui/icons-material";
import "./RestaurantDetail.css";
import Navbar from "../components/Navbar";
import BoxHeader from "../components/BoxHeader";
import { TextFieldInput, TextInput } from "../styles/InputStyles";
import { AlertColor, Autocomplete, Button, Rating } from "@mui/material";
import AlertBox from "../components/AlertBox";
import { RatingLabel } from "../constants/RatingLabel";
import { RestaurantTagMap, RestaurantTags } from "../constants/RestaurantTags";
import Footerbar from "../components/Footerbar";
import getSourceFromIframeText from "../functions/getSourceFromIframeText";
import { IRestaurant } from "../interfaces/IRestaurant";
import { DatePicker } from "@mui/x-date-pickers";
import { ILocation } from "../interfaces/ILocation";
import queryLocations from "../functions/queryLocations";
import handleUpdateRestaurant from "../functions/handleUpdateRestaurant";
import handleAddRestaurant from "../functions/handleAddRestaurant";

interface IUseLocation {
  state: {
    restaurant: IRestaurant;
  };
}

const RestaurantDetail: FC = () => {
  const location = useLocation() as unknown as IUseLocation;
  const [restaurant, setRestaurant] = useState<IRestaurant>(
    location.state?.restaurant || {
      img_url: "",
      restaurant_name: "",
      location_id: -1,
      location_name: "",
      restaurant_url: "",
      rating: -1,
      tag_id: -1,
      visit_date: new Date(),
      google_map_url: "",
    }
  );
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [hover, setHover] = useState<number>(-1);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertStatus, setAlertStatus] = useState<AlertColor>("info");

  useEffect(() => {
    let subscribed = true;
    queryLocations().then((response) => {
      if (subscribed && response) {
        setLocations(response);
      }
    });

    return () => {
      subscribed = false;
    };
    // eslint-disable-next-line
  }, []);

  function handleUpdateName(newName: string) {
    restaurant.restaurant_name = newName;
    setRestaurant(restaurant);
  }
  function handleUpdateVisitDate(newDate: Date) {
    restaurant.visit_date = new Date(newDate);
    setRestaurant(restaurant);
    setReload(!reload);
  }
  function handleUpdateImgUrl(newImgUrl: string) {
    restaurant.img_url = newImgUrl;
    setRestaurant(restaurant);
  }
  function handleUpdateExistedLocation(
    newLocation:
      | {
          location_id: number;
          location_name: string;
        }
      | string
      | null
  ) {
    if (newLocation !== null && typeof newLocation !== "string") {
      restaurant.location_id = newLocation.location_id;
      restaurant.location_name = newLocation.location_name;
      setRestaurant(restaurant);
      setReload(!reload);
    }
  }
  function handleUpdateTag(
    tag: { tag_id: number; tag_name: string } | string | null
  ) {
    if (tag !== null && typeof tag !== "string") {
      restaurant.tag_id = tag.tag_id;
      setRestaurant(restaurant);
    }
  }
  function handleUpdateGoogleMapUrl(newGoogleMapUrl: string) {
    restaurant.google_map_url = newGoogleMapUrl;
    setRestaurant(restaurant);
  }
  function handleUpdateLocationUrl(newLocationUrl: string) {
    restaurant.restaurant_url = newLocationUrl;
    setRestaurant(restaurant);
  }
  function handleUpdateRating(newrating: number) {
    restaurant.rating = newrating;
    setRestaurant(restaurant);
  }
  async function handleSubmitButtonClick(
    event: MouseEvent<HTMLButtonElement>,
    restaurant_id: number | undefined
  ) {
    setShowAlert(true);
    setAlertStatus("info");
    try {
      if (restaurant_id) {
        await handleUpdateRestaurant(restaurant);
      } else {
        await handleAddRestaurant(restaurant);
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
            // setAlertStatus={setAlertStatus}
          />
        </div>
        <Navbar>{`${
          restaurant.restaurant_id ? "EDIT" : "NEW"
        } RESTAURANT`}</Navbar>
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
                onChange={(newValue) =>
                  handleUpdateVisitDate(newValue || new Date())
                }
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
              <Autocomplete
                id="restaurant-location-autocomplete"
                freeSolo
                options={locations}
                defaultValue={{
                  location_id: restaurant.location_id,
                  location_name: restaurant.location_name || "",
                }}
                getOptionLabel={(option) => {
                  // Value selected with enter, right from the input
                  if (typeof option === "string") {
                    return option;
                  }
                  // Regular option
                  return option.location_name;
                }}
                renderOption={(props, option) => (
                  <li {...props}>{option.location_name}</li>
                )}
                onChange={(event, newValue) => {
                  handleUpdateExistedLocation(newValue);
                }}
                renderInput={(params) => (
                  <TextFieldInput
                    // fullWidth
                    // size="small"
                    sx={{
                      svg: { color: "black" },
                      input: {
                        position: "relative",
                        top: -8,
                        color: "black",
                        fontFamily: "Prompt",
                      },
                    }}
                    placeholder="Select Location"
                    {...params}
                  />
                )}
              />
            </div>

            <div>
              <BoxHeader>Restaurant Type</BoxHeader>
              <Autocomplete
                id="restaurant-tag-autocomplete"
                freeSolo
                defaultValue={{
                  tag_id: restaurant.tag_id,
                  tag_name: RestaurantTagMap[restaurant.tag_id] || "",
                }}
                onChange={(event, newValue) => {
                  handleUpdateTag(newValue);
                }}
                options={RestaurantTags}
                getOptionLabel={(option) => {
                  if (typeof option === "string") {
                    return option;
                  } else {
                    return option.tag_name;
                  }
                }}
                isOptionEqualToValue={(option, value) => {
                  if (value) {
                    return option === value;
                  }
                  return false;
                }}
                renderOption={(props, option) => (
                  <li {...props}>{option.tag_name}</li>
                )}
                renderInput={(params) => (
                  <TextFieldInput
                    sx={{
                      svg: { color: "black" },
                      input: {
                        position: "relative",
                        top: -8,
                        color: "black",
                        fontFamily: "Prompt",
                      },
                    }}
                    placeholder="Select Tag"
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
                  allowFullScreen={false}
                  loading="lazy"
                  aria-hidden="false"
                  tabIndex={0}
                />
              )}
            </div>
            <div>
              <BoxHeader>Rating</BoxHeader>
              <span className="detail-rating">
                <span>
                  <Rating
                    name="unique-rating"
                    value={restaurant.rating}
                    max={10}
                    sx={{ fontSize: "3vh" }}
                    onChange={(event, newValue) => {
                      handleUpdateRating(newValue || 0);
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
                <h2>{RatingLabel[hover !== -1 ? hover : restaurant.rating]}</h2>
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
                handleSubmitButtonClick(event, restaurant.restaurant_id)
              }
            >
              <div>
                <Save sx={{ position: "relative", top: "1px" }} />
              </div>
              <span>{restaurant.restaurant_id ? "UPDATE" : "SAVE"}</span>
            </button>
          }
        />
      </div>
    );
  } else {
    setRestaurant({
      img_url: "",
      restaurant_name: "",
      location_id: -1,
      location_name: "",
      restaurant_url: "",
      rating: -1,
      tag_id: -1,
      visit_date: new Date(),
      google_map_url: "",
    });
    // queryLocationList(setLocations);
    return <div>Loading . . .</div>;
  }
};

export default RestaurantDetail;
