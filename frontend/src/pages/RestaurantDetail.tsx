import React, {
  Dispatch,
  FC,
  MouseEvent,
  SetStateAction,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import { Map, Save, Star, StarBorder } from "@mui/icons-material";
import "./RestaurantDetail.css";
import Navbar from "../components/Navbar";
import BoxHeader from "../components/BoxHeader";
import { TextFieldInput, TextInput } from "../styles/InputStyles";
import {
  AlertColor,
  Autocomplete,
  Button,
  createFilterOptions,
  Rating,
} from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import handleAddRestaurant from "../functions/handleAddRestaurant";
// import handleUpdateRestaurant from "../functions/handleUpdateRestaurant";
// import queryLocationList from "../functions/queryLocationList";
// import handleAddLocation from "../functions/handleAddLocation";
import AlertBox from "../components/AlertBox";
import { RatingLabel } from "../constants/RatingLabel";
import { RestaurantTags, RestaurantTagMap } from "../constants/RestaurantTags";
import Footerbar from "../components/Footerbar";
import getSourceFromIframeText from "../functions/getSourceFromIframeText";
import { IRestaurant } from "../interfaces/IRestaurant";
import { DatePicker } from "@mui/x-date-pickers";
import { ILocation } from "../interfaces/ILocation";

interface IUseLocation {
  state: {
    restaurant: IRestaurant;
  };
}

// interface Props {
//   showAlert: boolean;
//   setShowAlert: Dispatch<SetStateAction<boolean>>;
//   alertStatus: AlertColor;
//   setAlertStatus: Dispatch<SetStateAction<AlertColor>>;
// }

const RestaurantDetail: FC = () => {
  const location = useLocation() as unknown as IUseLocation;
  const [restaurant, setRestaurant] = useState<IRestaurant>(
    location.state.restaurant
  );
  const [locations, setLocations] = useState<ILocation[]>([
    {
      location_id: 10,
      location_name: "Siam Paragon",
    },
    {
      location_id: 31,
      location_name: "สามย่าน",
    },
  ]);
  const [reload, setReload] = useState<boolean>(false);
  const [hover, setHover] = useState<number>(0);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertStatus, setAlertStatus] = useState<AlertColor>("info");

  const filter = createFilterOptions();

  function handleUpdateName(newName: string) {
    let tempRestaurant = restaurant;
    tempRestaurant.restaurant_name = newName;
    setRestaurant(tempRestaurant);
  }
  function handleUpdateVisitDate(newDate: Date) {
    let tempRestaurant = restaurant;
    tempRestaurant.visit_date = new Date(newDate);
    setRestaurant(tempRestaurant);
    setReload(!reload);
  }
  function handleUpdateImgUrl(newImgUrl: string) {
    let tempRestaurant = restaurant;
    tempRestaurant.img_url = newImgUrl;
    setRestaurant(tempRestaurant);
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
      let tempRestaurant = restaurant;
      tempRestaurant.location_id = newLocation.location_id;
      tempRestaurant.location_name = newLocation.location_name;
      setRestaurant(tempRestaurant);
      setReload(!reload);
    }
  }
  function handleUpdateTag(tag: { id: number; tag: string } | string | null) {
    if (tag !== null && typeof tag !== "string") {
      let tempRestaurant = restaurant;
      tempRestaurant.tag_id = tag.id;
      setRestaurant(tempRestaurant);
    }
  }
  function handleUpdateGoogleMapUrl(newGoogleMapUrl: string) {
    let tempRestaurant = restaurant;
    tempRestaurant.google_map_url = newGoogleMapUrl;
    setRestaurant(tempRestaurant);
  }
  function handleUpdateLocationUrl(newLocationUrl: string) {
    let tempRestaurant = restaurant;
    tempRestaurant.restaurant_url = newLocationUrl;
    setRestaurant(tempRestaurant);
  }
  function handleUpdateRating(newrating: number) {
    let tempRestaurant = restaurant;
    tempRestaurant.rating = newrating;
    setRestaurant(tempRestaurant);
  }
  async function handleSubmitButtonClick(
    event: MouseEvent<HTMLButtonElement>,
    restaurant_id: number | undefined
  ) {
    setShowAlert(true);
    setAlertStatus("info");
    try {
      if (restaurant_id) {
        // await handleUpdateRestaurant(event, restaurant);
      } else {
        // await handleAddRestaurant(event, restaurant);
      }
      setAlertStatus("success");
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } catch (error) {
      setAlertStatus("error");
    }
  }

  function test(location: any) {
    console.log(location);
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
                onChange={(event, newValue) => {
                  handleUpdateTag(newValue);
                }}
                options={RestaurantTags}
                getOptionLabel={(option) => {
                  if (typeof option === "string") {
                    return option;
                  } else {
                    return option.tag;
                  }
                }}
                isOptionEqualToValue={(option, value) => {
                  if (value) {
                    return option === value;
                  }
                  return false;
                }}
                renderOption={(props, option) => (
                  <li {...props}>{option.tag}</li>
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
