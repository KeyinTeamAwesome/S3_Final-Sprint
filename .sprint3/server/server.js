require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
//Set Port to 3500
const PORT = process.env.PORT || 3500;
//Middleware
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");


// Connect to database
connectDB();

// Log every route request
app.use(logger);
// CORS
app.use(cors(corsOptions));


// BUILT-IN FORMDATA:
app.use(express.urlencoded({ extended: false }));
// BUILT-IN JSON DATA:
app.use(express.json());
// SERVE STATIC FILES
app.use("/", express.static(path.join(__dirname, "/public")));

// Routes:
app.use("/", require("./routes/root"));
app.use("/query", require("./routes/api/query"));
app.use("/movies", require("./routes/api/movies"));
// app.use("/logout", require("./routes/api/logout"));

// 404
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// Error handler
app.use(errorHandler);

// Open connection to DB
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB database.");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
