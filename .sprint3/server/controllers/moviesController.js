const Movie = require("../model/Movie");
const Query = require("../model/Query");

// write a function that searches Movie collection for movies that match the query which is req.body.movie



const getMovies = async (req, res) => {
  console.log(req.body.searchTerms)
  try{
    let savedQuery = await Query.create({
      searchTerms: req.body.searchTerms,
      database: req.body.database
    })
    let result = await Movie.find({
      $or: [
        { title: { $regex: req.body.searchTerms, $options: "i" } },
        { genre: { $regex: req.body.searchTerms, $options: "i" } },
      ],
    });
    res.json(result)
    console.log(savedQuery);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getMovies };