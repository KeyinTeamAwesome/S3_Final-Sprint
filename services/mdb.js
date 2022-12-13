const { MongoClient } = require("mongodb");
require("dotenv").config();

// .env file must contain: ATLAS_URI=<your mongo connection string>
const uri = process.env.ATLAS_URI;
const pool = new MongoClient(uri);

module.exports = pool;
