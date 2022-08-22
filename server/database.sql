CREATE DATABASE restaurant_checklist;

CREATE TABLE restaurants(
    restaurant_id SERIAL PRIMARY KEY,
    restaurant_name VARCHAR(255) NOT NULL,
    img_url VARCHAR NOT NULL,
    location_id Integer,
    rating Integer,
    visit_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE locations(
    location_id SERIAL PRIMARY KEY,
    location_name VARCHAR(255) NOT NULL
);

CREATE TABLE movies(
    movie_id SERIAL PRIMARY KEY,
    movie_name VARCHAR(255) NOT NULL,
    movie_img_url VARCHAR NOT NULL,
    location_id Integer,
    imdb Real,
    rotten_tomatoes Real,
    rating Integer,
    watch_date DATE NOT NULL DEFAULT CURRENT_DATE
);

--set extension
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_emal VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
);

SELECT * FROM restaurants;

ALTER TABLE restaurants ADD CONSTRAINT location_id FOREIGN KEY(location_id) REFERENCES locations(id);

SELECT restaurants.name, locations.name
FROM restaurants INNER JOIN locations ON restaurants.location_id = locations.id;
