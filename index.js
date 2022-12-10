// Date: Dec 7, 2022
// Assignment: Semester 3 Final Sprint
// Course Name: Full Stack JavaScript
// Written By: Kara Balsom, Makenzie Roberts and David Turner

// When a path in the NAV on the browser is selected it will route to the named JS file in the routes or routes api folder respectively.  That selection will trigger an HTTP method either upon selection or as a listener is pressed such as a button or <a> tag link, resulting call is built like a function.  The functions here are build around GET/POST/PUT/PATCH/DELETE requests which will then go to the DAL (data access layer) where the data from the specified collection in mongo is retrieved, that data is then parsed and sent back through functions GET/POST/PUT/PATCH/DELETE that were requested.  This data will be displayed through the approriate EJS file and subsequently in the browser.

const express = require("express");
const methodOverride = require("method-override");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const app = express();
const PORT = 3010;

global.DEBUG = true;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Added from passport tutorial in lecture, includes .use passport
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", checkAuthenticated, async (req, res) => {
  res.render("home.ejs");
});

const searchRouter = require("./routes/search");
app.use("/search", searchRouter, checkAuthenticated);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter, checkAuthenticated);

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}.`);
});
