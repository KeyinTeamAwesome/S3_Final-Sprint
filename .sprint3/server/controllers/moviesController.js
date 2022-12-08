const Movie = require("../model/Movie");


const getMovies = async(req, res) => {
    const query = req.body



    
    const matches =  Movie.find({ movie: { $regex: query.searchTerm, $options: "i" }});
    if (!matches)
        return res.status(204).json({ message: "No matches found in database." });
    res.status(200);
}

module.exports = { getMovies };