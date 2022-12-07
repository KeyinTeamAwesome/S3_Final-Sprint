var router = require("express").Router();
const actorsDal = require("../../services/m.movies.dal");
var bodyParser = require("body-parser");
router.use(bodyParser.json());

// This will bring in the "fs" or file structure global object no npm install required
const fs = require("fs");
// This will bring in the "events" global object no npm install required
const eventEmmitter = require("events");
// Create the class MyEmitter to define it, making sure to the first letter is upper case, this is for classes
class MyEmitter extends eventEmmitter {}
// This instantiates a new emitter object that will be needed to access the index page
const myEmitter = new MyEmitter();

// This allows routes.js to access the functions within the logEvents.js
const logEvents = require("../logEvents");

// Creating an dot addListener or dot on function, it will have name "routes", this could be anything and functions below can have different names
// to serve different purposes then there are in this case 3 parameters, event, level (ex: information, error), and a message that can be logged
myEmitter.on("status", (msg, theStatusCode) => {
  // once the above part of the listeners has exicuted its block
  // the logEvents function in logEvents.js will fire and the parameters here will be sent over to be processed
  logEvents(msg, theStatusCode);
});

// api/movies
router.get("/", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/movies/ GET " + req.url);
  try {
    let theMovies = await actorsDal.getMovies();
    res.json(theMovies);
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    theStatusCode = res.statusCode;
    msg = "Status Code for API GET: ";
    myEmitter.emit("status", msg, theStatusCode);
    res.json({ message: "Service Unavailable", status: 503 });
  }
});
// api/movies/:id
router.get("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/movies/:id GET " + req.url);
  try {
    let anActor = await actorsDal.getMoviesByMovieId(req.params.id);
    if (anActor.length === 0) {
      // log this error to an error log file.
      res.statusCode = 404;
      theStatusCode = res.statusCode;
      msg = "Status Code for API GET by Id: ";
      myEmitter.emit("status", msg, theStatusCode);
      res.json({ message: "Not Found", status: 404 });
    } else res.json(anActor);
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    theStatusCode = res.statusCode;
    msg = "Status Code for API GET by Id: ";
    myEmitter.emit("status", msg, theStatusCode);
    res.json({ message: "Service Unavailable", status: 503 });
  }
});
router.post("/", async (req, res) => {
  if (DEBUG) {
    console.log("ROUTE: /api/movies/ POST");
  }
  try {
    console.log(req.body.genres);
    await actorsDal.addMovie(
      req.body.genres,
      req.body.title,
      req.body.rated,
      req.body.year
    );
    res.statusCode = 201;
    res.json({ message: "Created", status: 201 });
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    theStatusCode = res.statusCode;
    msg = "Status Code for API POST: ";
    myEmitter.emit("status", msg, theStatusCode);
    res.json({ message: "Service Unavailable", status: 503 });
  }
});
router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/movies PUT " + req.params.id);
  try {
    await actorsDal.putMovie(
      req.params.id,
      req.body.genres,
      req.body.title,
      req.body.rated,
      req.body.year
    );
    res.statusCode = 200;
    res.json({ message: "OK", status: 200 });
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    theStatusCode = res.statusCode;
    msg = "Status Code for API PUT by Id: ";
    myEmitter.emit("status", msg, theStatusCode);
    res.json({ message: "Service Unavailable", status: 503 });
  }
});
router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/movies PATCH " + req.params.id);
  try {
    await actorsDal.patchMovie(
      req.params.id,
      req.body.genres,
      req.body.title,
      req.body.rated,
      req.body.year
    );
    res.statusCode = 200;
    res.json({ message: "OK", status: 200 });
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    theStatusCode = res.statusCode;
    msg = "Status Code for API PATCH by Id: ";
    myEmitter.emit("status", msg, theStatusCode);
    res.json({ message: "Service Unavailable", status: 503 });
  }
});
router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/movies DELETE " + req.params.id);
  try {
    await actorsDal.deleteMovie(req.params.id);
    res.statusCode = 200;
    res.json({ message: "OK", status: 200 });
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    theStatusCode = res.statusCode;
    msg = "Status Code for API DELETE by Id: ";
    myEmitter.emit("status", msg, theStatusCode);
    res.json({ message: "Service Unavailable", status: 503 });
  }
});
// list the active api routes
if (DEBUG) {
  router.stack.forEach(function (r) {
    if (r.route && r.route.path) {
      console.log(r.route.path);
    }
  });
}

module.exports = router;
