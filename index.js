'use strict'
var cors = require("cors");
const repoContext = require("./repository/repository-wrapper.js");
const express = require('express');
const { movies } = require("./repository/json-context.js");
const validators = require("./validators/custom-validations.js");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => validators.body(req, res, next));

app.listen(3000, function() {
    console.log('Server started. Listening on port 3000.');
});


app.get("/api/movies", (req, res) => {
    let id = req.params.id;
    let movies = repoContext.movies.findAllMovies(id);
    res.send(movies);
});

app.get("/api/movies/:id", (req, res) => {
    let id = req.params.id;
    let movies = repoContext.movies.findMovieById(id);
    res.send(movies);
});

app.post("/api/movies/:genre", (req, res) => {
    let genre = req.params.body;
    let movies = repoContext.movies.findAllMoviesByGenre(genre);
    res.send(movies);
});
app.post("/api/movies/:director", (req, res) => {
    let director = req.params.body;
    let movies = repoContext.movies.findAllMoviesByGenre(director);
    res.send(movies);
});
app.post("/api/movies/:title", (req, res) => {
    let title = req.params.body;
    let movies = repoContext.movies.findAllMoviesByGenre(title);
    res.send(movies);
});

app.post("/api/movies/:id", (req, res) => {
    let newMovie = req.body;
    let addedMovies = repoContext.movies.createMovie(newMovie);
    res.send(addedMovies);
});

app.put("/api/movies", (req, res) => {
    let productToUpdate = req.body;
    let updatedMovie = repoContext.movies.updateMovie(productToUpdate);
    res.send(updatedMovie);
});

app.delete("/api/movies/:id", (req, res) => {
    let id = req.params.id;
    let updatedDataSet = repoContext.movies.deleteMovie(id);
    res.send(updatedDataSet);
});