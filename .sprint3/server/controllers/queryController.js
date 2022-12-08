const Query = require("../model/Query");

const saveQuery = async(req, res) => {
    console.log(req.body)
    const query = req.body

    try{
        const result = await Query.create({
            userId: req.body.userId,
            searchTerm: req.body.searchTerm
        });
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { saveQuery };