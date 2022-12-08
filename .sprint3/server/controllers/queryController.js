const Query = require("../model/Query");
const getMovies = require("./moviesController");

const saveQuery = async(req, res) => {
    console.log(req.body)
    try{
        const result = await Query.create({
            searchTerms: req.body.searchTerms,
            database: req.body.database
        });
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { saveQuery };