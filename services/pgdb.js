const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "fullstack_sprint2",
  password: "MacAlex",
  port: 5432,
});
module.exports = pool;
