require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//RESTAURANTS
//get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const allRestaurants = await pool.query(
      "SELECT * FROM restaurants INNER JOIN locations ON restaurants.location_id = locations.location_id"
    );

    res.json(allRestaurants.rows);
  } catch (error) {
    console.error(error.message);
  }
});
//get all locations filter by location_id
app.get("/api/v1/restaurants/filter/:location_id", async (req, res) => {
  try {
    const { location_id } = req.params;
    const allRestaurants = await pool.query(
      "SELECT * FROM restaurants INNER JOIN locations ON restaurants.location_id = locations.location_id WHERE restaurants.location_id = $1",
      [location_id]
    );

    res.json(allRestaurants.rows);
  } catch (error) {
    console.error(error.message);
  }
});
//get a restaurant
app.get("/api/v1/restaurants/:restaurant_id", async (req, res) => {
  try {
    const { restaurant_id } = req.params;
    const restaurant = await pool.query(
      "SELECT * FROM restaurants INNER JOIN locations ON restaurants.location_id = locations.location_id WHERE restaurants.restaurant_id = $1",
      [restaurant_id]
    );

    res.json(restaurant.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//add a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const {
      img_url,
      location_id,
      rating,
      restaurant_name,
      restaurant_url,
      visit_date,
      google_map_url,
    } = req.body;
    const newRestaurant = await pool.query(
      "INSERT INTO restaurants (img_url, location_id, rating, restaurant_name, restaurant_url, visit_date, google_map_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        img_url,
        location_id,
        rating,
        restaurant_name,
        restaurant_url,
        visit_date,
        google_map_url,
      ]
    );

    res.json(newRestaurant.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//update a restaurant
app.put("/api/v1/restaurants/:restaurant_id", async (req, res) => {
  try {
    const { restaurant_id } = req.params;
    const {
      img_url,
      location_id,
      rating,
      restaurant_name,
      restaurant_url,
      visit_date,
      google_map_url,
    } = req.body;

    await pool.query(
      "UPDATE restaurants SET img_url = $1, location_id = $2, rating = $3, restaurant_name = $4, restaurant_url = $5, visit_date = $6, google_map_url = $7 WHERE restaurant_id = $8",
      [
        img_url,
        location_id,
        rating,
        restaurant_name,
        restaurant_url,
        visit_date,
        google_map_url,
        restaurant_id,
      ]
    );

    res.json(`${restaurant_id} ${restaurant_name} was update`);
  } catch (error) {
    console.error(error.message);
  }
});

//delete a restaurant
app.delete("/api/v1/restaurants/:restaurant_id", async (req, res) => {
  try {
    const { restaurant_id } = req.params;
    await pool.query("DELETE FROM restaurants WHERE restaurant_id = $1", [
      restaurant_id,
    ]);

    res.json(`${restaurant_id} was delete`);
  } catch (error) {
    console.error(error.message);
  }
});

//MOVIES
//get all movies
app.get("/api/v1/movies", async (req, res) => {
  try {
    const allMovies = await pool.query(
      "SELECT * FROM movies INNER JOIN locations ON movies.location_id = locations.location_id ORDER BY movie_id"
    );

    res.json(allMovies.rows);
  } catch (error) {
    console.error(error.message);
  }
});
//get all movies filter by movie_id
app.get("/api/v1/movies/filter/:location_id", async (req, res) => {
  try {
    const { location_id } = req.params;
    const allRestaurants = await pool.query(
      "SELECT * FROM movies INNER JOIN locations ON movies.location_id = locations.location_id WHERE movies.location_id = $1",
      [location_id]
    );

    res.json(allRestaurants.rows);
  } catch (error) {
    console.error(error.message);
  }
});
//get a movies by movie_id
app.get("/api/v1/movies/:movie_id", async (req, res) => {
  try {
    const { movie_id } = req.params;
    const movie = await pool.query(
      "SELECT * FROM movies INNER JOIN locations ON movies.location_id = locations.location_id WHERE movies.movie_id = $1",
      [movie_id]
    );

    res.json(movie.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});
//add a movie
app.post("/api/v1/movies", async (req, res) => {
  try {
    const {
      movie_name,
      movie_img_url,
      location_id,
      imdb,
      rotten_tomatoes,
      rating,
    } = req.body;
    const newMovie = await pool.query(
      "INSERT INTO movies (movie_name, movie_img_url, location_id, imdb, rotten_tomatoes, rating) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [movie_name, movie_img_url, location_id, imdb, rotten_tomatoes, rating]
    );

    res.json(newMovie);
  } catch (error) {
    console.error(error.message);
  }
});

//update a movie
app.put("/api/v1/movies/:movie_id", async (req, res) => {
  try {
    const { movie_id } = req.params;
    const {
      movie_name,
      movie_img_url,
      location_id,
      imdb,
      rotten_tomatoes,
      rating,
      watch_date,
    } = req.body;
    const newMovie = await pool.query(
      "UPDATE movies SET movie_name = $1, movie_img_url = $2, location_id = $3, imdb = $4, rotten_tomatoes = $5, rating = $6, watch_date = $7 WHERE movie_id = $8",
      [
        movie_name,
        movie_img_url,
        location_id,
        imdb,
        rotten_tomatoes,
        rating,
        watch_date,
        movie_id,
      ]
    );

    res.json(newMovie);
  } catch (error) {
    console.error(error.message);
  }
});
//delete a movie
app.delete("/api/v1/movies/:movie_id", async (req, res) => {
  try {
    const { movie_id } = req.params;
    await pool.query("DELETE FROM movies WHERE movie_id = $1", [movie_id]);

    res.json(`${movie_id} was delete`);
  } catch (error) {
    console.error(error.message);
  }
});
//LOCATIONS
//get all locations
app.get("/api/v1/locations", async (req, res) => {
  try {
    const allLocations = await pool.query(
      "SELECT * FROM locations ORDER BY location_id"
    );

    res.json(allLocations.rows);
  } catch (error) {
    console.error(error.message);
  }
});
//get all locations sort by location_id desc
app.get("/api/v1/locations/desc", async (req, res) => {
  try {
    const allLocations = await pool.query(
      "SELECT * FROM locations ORDER BY location_id DESC"
    );

    res.json(allLocations.rows);
  } catch (error) {
    console.error(error.message);
  }
});
//get all locations sort by location_name
app.get("/api/v1/locations/sort/location_name", async (req, res) => {
  try {
    const allLocations = await pool.query(
      "SELECT * FROM locations ORDER BY location_name"
    );

    res.json(allLocations.rows);
  } catch (error) {
    console.error(error.message);
  }
});
//get all locations sort by location_name descending
app.get("/api/v1/locations/sort/location_name/desc", async (req, res) => {
  try {
    const allLocations = await pool.query(
      "SELECT * FROM locations ORDER BY location_name DESC"
    );

    res.json(allLocations.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//add a location
app.post("/api/v1/locations", async (req, res) => {
  try {
    const { location_name } = req.body;
    const newLocation = await pool.query(
      "INSERT INTO locations (location_name) VALUES ($1) RETURNING *",
      [location_name]
    );

    res.json(newLocation);
  } catch (error) {
    console.error(error.message);
  }
});
//delete a location
app.delete("/api/v1/locations/:location_id", async (req, res) => {
  try {
    const { location_id } = req.params;
    await pool.query("DELETE FROM locations WHERE location_id = $1", [
      location_id,
    ]);

    res.json("location was deleted");
  } catch (error) {
    console.error(error.message);
  }
});
//update a location name
app.put("/api/v1/locations/:location_id", async (req, res) => {
  try {
    const { location_id } = req.params;
    const { location_name } = req.body;

    await pool.query(
      "UPDATE locations SET location_name = $1 WHERE location_id = $2",
      [location_name, location_id]
    );

    res.json(`${location_id} ${location_name} was update`);
  } catch (error) {
    console.error(error.message);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is starting on port ${port}`);
});
