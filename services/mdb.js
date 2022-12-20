const { MongoClient } = require("mongodb"); //Require mongodb.
require("dotenv").config(); //Configure dotenv

// .env file must contain: ATLAS_URI=<your mongo connection string>
const uri = process.env.ATLAS_URI; //Assign constant uri to the ATLAS_URI.
const pool = new MongoClient(uri); //Assign constant pool the new MongoClient uri.

module.exports = pool; //Export pool.
