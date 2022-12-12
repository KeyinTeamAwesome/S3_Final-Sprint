const { MongoClient } = require("mongodb");
const uri =
	"mongodb+srv://keyin:keyin2022@fall2022dbms.eknfljt.mongodb.net/test";
const pool = new MongoClient(uri);

module.exports = pool;
