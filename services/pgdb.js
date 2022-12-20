const Pool = require("pg").Pool; //Require Pool
const pool = new Pool({
  //Set up a new Pool with your postgres user/database information, and assign it to the constant pool.
  user: "postgres",
  host: "localhost",
  database: "fullstack_sprint2",
  password: "MacAlex",
  port: 5432,
});
module.exports = pool; //Export pool.
