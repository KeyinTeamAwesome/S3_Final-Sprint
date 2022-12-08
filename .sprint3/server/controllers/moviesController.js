const Movie = require("../model/Movie");

// write a function that searches Movie collection for movies that match the query which is req.body.movie
const getMovies = async (req, res) => {
  console.log(req.body.searchTerms)
    try {
      let result = await Movie.find({
        $or: [
          { title: { $regex: req.body.searchTerms, $options: "i" } },
          { genre: { $regex: req.body.searchTerms, $options: "i" } },
        ],
      });
      console.log(result)
      res.json(result);
    } catch (err) {
      console.log(err);
    }
  };

module.exports = { getMovies };