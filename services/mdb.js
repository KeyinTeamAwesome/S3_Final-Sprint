const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://kbalsom:MacAlex@sprint.rugscot.mongodb.net/test";
const pool = new MongoClient(uri);

module.exports = pool;
