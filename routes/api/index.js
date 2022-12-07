var router = require("express").Router();

if (DEBUG) {
  console.log("ROUTE: /api/movies");
}

const actorsRouter = require("./movies");
router.use("/movies", actorsRouter);

module.exports = router;
