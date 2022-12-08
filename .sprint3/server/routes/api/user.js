const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

router.post("/", moviesController.registerUser);
router.post("/", moviesController.loginUser);
router.post("/", moviesController.logoutUser);


module.exports = router;
