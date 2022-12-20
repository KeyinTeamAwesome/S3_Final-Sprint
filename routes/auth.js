const express = require("express");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const router = express.Router();
const { addLogin, getLoginByUsername } = require("../services/auth.dal");
const fs = require("fs");
// This will bring in the "events" global object no npm install required
const eventEmmitter = require("events");
// Create the class MyEmitter to define it, making sure to the first letter is upper case, this is for classes
class MyEmitter extends eventEmmitter {}
// This instantiates a new emitter object that will be needed to access the index page
const myEmitter = new MyEmitter();
// This allows routes.js to access the functions within the logEvents.js
const logEvents = require("../logging/logEvents");

// Creating an dot addListener or dot on function, it will have name "routes", this could be anything and functions below can have different names
// to serve different purposes then there are in this case 3 parameters, event, level (ex: information, error), and a message that can be logged
myEmitter.on("status", (msg, theStatusCode) => {
  // once the above part of the listeners has exicuted its block
  // the logEvents function in logEvents.js will fire and the parameters here will be sent over to be processed
  logEvents(msg, theStatusCode);
});

router.use(express.static("public")); // May not be necessary since it's in index.js

router.get("/", async (req, res) => {
  if (DEBUG) console.log("login page: ");
  res.render("search.ejs", { status: req.app.locals.status });
});

router.post("/", async (req, res) => {
  try {
    if (DEBUG) console.log("auth.getLoginByUsername().try");
    let user = await getLoginByUsername(req.body.username);
    if (DEBUG) console.log(user);
    if (user === undefined) {
      req.app.locals.status = "Incorrect user name was entered.";
      res.redirect("/auth");
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
      // change using app.locals to use session or java web token (jwt)
      req.app.locals.user = user;
      req.app.locals.status = "Happy for your return " + user.username;
      res.redirect("/search/");
    } else {
      req.app.locals.status = "Incorrect password was entered.";
      res.redirect("/auth");
    }
  } catch (error) {
    console.log(error);
    if (DEBUG) console.log("auth.getLoginByUsername().catch: " + user.username);
    res.render("503.ejs");
    // log this error to an error log file.
  }
});

// from http browser it has /auth/new
router.get("/new", async (req, res) => {
  res.render("register.ejs", { status: req.app.locals.status });
});

router.post("/new", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    if (req.body.email && req.body.username && req.body.password) {
      var result = await addLogin(
        req.body.username,
        req.body.email,
        hashedPassword,
        uuid.v4()
      );
      if (DEBUG) console.log("result: " + result);
      // duplicate username, comes from uniqueness constraint
      // in postgresql(err.code=23505) OR mongodb(err.code=11000)
      if (result === "23505" || result === 11000) {
        if (DEBUG) console.log("Username already exists, please try another.");
        req.app.locals.status = "Username already exists, please try another.";
        res.redirect("/auth/new");
      } else {
        req.app.locals.status = "New account created, please login.";
        res.redirect("/auth");
      }
    } else {
      if (DEBUG) console.log("Not enough form fields completed.");
      req.app.locals.status = "Not enough form fields completed.";
      res.redirect("/auth/new");
    }
  } catch (error) {
    console.log(error);
    res.render("503.ejs");
    // log this error to an error log file.
  }
});

router.get("/exit", async (req, res) => {
  if (DEBUG) console.log("get /exit");
  res.redirect("/");
});

module.exports = router;
