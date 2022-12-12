const express = require("express");
const router = express.Router();
const pp = require("../passport");
const searchDal = require("../services/search.dal");
const authDal = require("../services/auth.dal");

// const actorsDal = require("../services/m.movies.dal");

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
const queryEvents = require("./queries");

// Creating an dot addListener or dot on function, it will have name "routes", this could be anything and functions below can have different names
// to serve different purposes then there are in this case 3 parameters, event, level (ex: information, error), and a message that can be logged
myEmitter.on("status", (msg, theStatusCode) => {
  // once the above part of the listeners has exicuted its block
  // the logEvents function in logEvents.js will fire and the parameters here will be sent over to be processed
  logEvents(msg, theStatusCode);
});

myEmitter.on("query", (msg, theDatabase) => {
  // once the above part of the listeners has exicuted its block
  // the logEvents function in logEvents.js will fire and the parameters here will be sent over to be processed
  queryEvents(msg, theDatabase);
});

router.get("/", pp.checkAuthenticated, async (req, res, next) => {
  console.log("index.js: router.get(/) checkAuth | render search | ");
  //   console.log(`RIGHT HERE!!!: ${authDal.kara}`);
  if (DEBUG)
    console.log(
      "/search/ Initial Get: ",
      req.query.searchTerm,
      !req.query.searchTerm
    );
  if (!req.query.searchTerm) {
    try {
      res.render("search.ejs");
    } catch {
      res.render("503");
    }
  } else {
    next();
  }
});

router.get("/", async (req, res) => {
  if (DEBUG) console.log("/search/ Next: ", req.query);
  try {
    console.log("req.body", req.body);
    let movies = await searchDal.getMovies(
      req.query.searchTerm,
      req.query.database
    );
    console.log(req.query.database);
    theDatabase = req.query.database;
    msg = req.query.searchTerm;
    console.log(_id);
    myEmitter.emit("query", msg, theDatabase);

    // Error handling for ejs errors caused by results from an invalid search, for instance
    // if someone manually types in a url query param of a database that does not exist, or
    // any other possible query params that cannot be handled.
    res.render("results.ejs", { movies }, function (err, html) {
      if (err) {
        console.log(err);
        res.render("503");
      } else {
        res.send(html);
      }
    });
  } catch {
    res.render("503");
  }
});

// router.post("/", async (req, res) => {
//   if (DEBUG) console.log("movies.POST");
//   try {
//     await actorsDal.addMovie(
//       req.body.genres,
//       req.body.title,
//       req.body.rated,
//       req.body.year
//     );
//     res.redirect("/movies/");
//   } catch {
//     // log this error to an error log file.
//     res.statusCode = 503;
//     theStatusCode = res.statusCode;
//     msg = "Status Code for POST: ";
//     myEmitter.emit("status", msg, theStatusCode);
//     res.render("503");
//   }
// });

module.exports = router;
