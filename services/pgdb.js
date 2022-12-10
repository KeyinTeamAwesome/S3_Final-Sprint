const Pool = require("pg").Pool;
const pool = new Pool({
  user: "peter",
  host: "localhost",
  database: "dvdrental",
  password: "royisanerd",
  port: 5432,
});
module.exports = pool;
