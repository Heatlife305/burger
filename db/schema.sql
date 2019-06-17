CREATE DATABASE burger_db;

USE DATABASE burger_db;

CREATE TABLE burgers (
    id INT AUTO-INCREMENT PRIMARY KEY,
    burger_name VARCHAR(100),
    devoured BOOLEAN
);