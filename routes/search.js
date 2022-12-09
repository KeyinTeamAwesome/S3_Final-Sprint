const express = require("express");
const router = express.Router();
const actorsDal = require("../services/m.movies.dal");

// This will bring in the "fs" or file structure global object no npm install required
const fs = require("fs");
// This will bring in the "events" global object no npm install required
const eventEmmitter = require("events");
// Create the class MyEmitter to define it, making sure to the first letter is upper case, this is for classes
class MyEmitter extends eventEmmitter {}
// This instantiates a new emitter object that will be needed to access the index page
const myEmitter = new MyEmitter();

// This allows routes.js to access the functions within the logEvents.js
const logEvents = require("./logEvents");

// Creating an dot addListener or dot on function, it will have name "routes", this could be anything and functions below can have different names
// to serve different purposes then there are in this case 3 parameters, event, level (ex: information, error), and a message that can be logged
myEmitter.on("status", (msg, theStatusCode) => {
  // once the above part of the listeners has exicuted its block
  // the logEvents function in logEvents.js will fire and the parameters here will be sent over to be processed
  logEvents(msg, theStatusCode);
});

router.get("/", async (req, res) => {
  // const theMovies = [
  //     {title: 'Terminator', genres: 'Action', rated: 'R', , year: '1984'},
  //     {title: 'Terminator 2', genres: 'Action', rated: 'R', , year: '1991'},
  //     {title: 'Terminator 3', genres: 'Action', rated: 'R', , year: '2003'},
  // ];
  try {
    let theMovies = await actorsDal.getMovies();
    if (DEBUG) console.table(theMovies);
    res.render("movies", { theMovies });
  } catch {
    res.statusCode = 503;
    theStatusCode = res.statusCode;
    msg = "Status Code for GET: ";
    myEmitter.emit("status", msg, theStatusCode);
    res.render("503");
  }
});

router.get("/:id", async (req, res) => {
  // const anActor = [
  //     {title: 'Terminator', genres: 'Action', rated: 'R', , year: '1984'},
  // ];
  try {
    let anActor = await actorsDal.getMoviesByMovieId(req.params.id); // from postgresql
    if (anActor.length === 0) res.render("norecord");
    else res.render("actor", { anActor });
  } catch {
    res.statusCode = 503;
    theStatusCode = res.statusCode;
    msg = "Status Code for GET by Id: ";
    myEmitter.emit("status", msg, theStatusCode);
    res.render("503");
  }
});

router.get("/:id/replace", async (req, res) => {
  if (DEBUG) console.log("movie.Replace : " + req.params.id);
  res.render("moviePut.ejs", {
    genres: req.query.genres,
    title: req.query.title,
    rated: req.query.rated,
    year: req.query.year,
    id: req.params.id,
  });
});

router.get("/:id/edit", async (req, res) => {
  if (DEBUG) console.log("movie.Edit : " + req.params.id);
  res.render("moviePatch.ejs", {
    genres: req.query.genres,
    title: req.query.title,
    rated: req.query.rated,
    year: req.query.year,
    id: req.params.id,
  });
});

router.get("/:id/delete", async (req, res) => {
  if (DEBUG) console.log("movie.Delete : " + req.params.id);
  res.render("movieDelete.ejs", {
    genres: req.query.genres,
    title: req.query.title,
    rated: req.query.rated,
    year: req.query.year,
    id: req.params.id,
  });
});

router.post("/", async (req, res) => {
  if (DEBUG) console.log("movies.POST");
  try {
    await actorsDal.addMovie(
      req.body.genres,
      req.body.title,
      req.body.rated,
      req.body.year
    );
    res.redirect("/movies/");
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    theStatusCode = res.statusCode;
    msg = "Status Code for POST: ";
    myEmitter.emit("status", msg, theStatusCode);
    res.render("503");
  }
});

// PUT, PATCH, and DELETE are part of HTTP, not a part of HTML
// Therefore, <form method="PUT" ...> doesn't work, but it does work for RESTful API

router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("movies.PUT: " + req.params.id);
  try {
    await actorsDal.putMovie(
      req.params.id,
      req.body.genres,
      req.body.title,
      req.body.rated,
      req.body.year
    );
    res.redirect("/movies/");
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    theStatusCode = res.statusCode;
    msg = "Status Code for PUT by Id: ";
    myEmitter.emit("status", msg, theStatusCode);
    res.render("503");
  }
});
router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("movies.PATCH: " + req.params.id);
  try {
    await actorsDal.patchMovie(
      req.params.id,
      req.body.genres,
      req.body.title,
      req.body.rated,
      req.body.year
    );
    res.redirect("/movies/");
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    theStatusCode = res.statusCode;
    msg = "Status Code for PATCH by Id: ";
    myEmitter.emit("status", msg, theStatusCode);
    res.render("503");
  }
});
router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("movies.DELETE: " + req.params.id);
  try {
    await actorsDal.deleteMovie(req.params.id);
    res.redirect("/movies/");
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    theStatusCode = res.statusCode;
    msg = "Status Code for DELETE by Id: ";
    myEmitter.emit("status", msg, theStatusCode);
    res.render("503");
  }
});

module.exports = router;
