const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://DT-Keyin:Keyin2021@dvddb.cq2poz6.mongodb.net/test";
const pool = new MongoClient(uri);

module.exports = pool;
