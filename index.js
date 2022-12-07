// Date: Nov 25, 2022
// Assignment: QAP3
// Course Name: Full Stack JavaScript
// Written By: David Turner

// When a path in the NAV on the browser is selected it will route to the named JS file in the routes or routes api folder respectively.  That selection will trigger an HTTP method either upon selection or as a listener is pressed such as a button or <a> tag link, resulting call is built like a function.  The functions here are build around GET/POST/PUT/PATCH/DELETE requests which will then go to the DAL (data access layer) where the data from the specified collection in mongo is retrieved, that data is then parsed and sent back through functions GET/POST/PUT/PATCH/DELETE that were requested.  This data will be displayed through the approriate EJS file and subsequently in the browser.

const express = require("express");
const methodOverride = require("method-override");
const app = express();
const PORT = 3010;

global.DEBUG = true;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index.ejs", { name: "David Turner" });
});

const moviesRouter = require("./routes/movies");
app.use("/movies", moviesRouter);

const staffRouter = require("./routes/staff");
app.use("/staff", staffRouter);

const mngrRouter = require("./routes/mngr");
app.use("/mngr", mngrRouter);

// anything beginning with "/api" will go into this
const apiRouter = require("./routes/api/movies");
app.use("/api/movies", apiRouter);

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}.`);
});
