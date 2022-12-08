const express = require("express");
const router = express.Router();
const moviesController = require("../../controllers/moviesController");

router.post("/", moviesController.getMovies);

module.exports = router;
