const { ObjectId } = require("mongodb");
const mDal = require("./mdb");
const pgDal = require("./pgdb");

async function getMovies(searchTerm, database) {
  if (DEBUG) console.log("getMovies() in search.dal.js");
  if (database === "mongodb") {
    let queryObj = new Object();
    /*
    When a user enters a search term, we want to search for it through all categories.
		For example, if the user searches for "2000" it will return all movies released in
		the year 2000, but also any movies with "2000" in the title.

		Since all our year values are integers, we need to search for them as integers - but
		since the other fields are strings we don't want to search for them as integers.
		Therefore, just for the year field, we just check if the search term is a number or
		not, and if it is, we convert it to an integer. In mongo this works because types are
		not enforced when querying, so even if we pass a string to a field that is an integer,
		it will still work as intended and not throw an error. For postgreSQL we'll handle
		this a little differently.
    */
    queryObj["$or"] = [
      { title: new RegExp(searchTerm, "i") },
      { genre: new RegExp(searchTerm, "i") },
      { year: isNaN(Number(searchTerm)) ? searchTerm : Number(searchTerm) },
    ];

    console.log("query: ", queryObj);

    try {
      await mDal.connect();
      const cursor = await mDal
        .db("sprint2")
        .collection("movies")
        .find(queryObj);
      const results = await cursor.toArray();
      console.log(results);
      if (DEBUG) console.log("MongoDB Results: ", results);
      return results;
    } catch (error) {
      console.log(error);
      // Maybe send back a 503 here as well? Not sure if I'll have to. We'll see. !REFERENCE my(kenzi) copy of Jamie's mongo-support folder
    }
  }

  if (database === "postgresql") {
    if (DEBUG) console.log("getMovies() postgres selected");

    let title = `%${searchTerm}%`;
    let genre = `%${searchTerm}%`;
    let year = Number(searchTerm); // Here we try to convert the search term to a number. If it's not a number, it will return NaN - which we will check for below.

    let results = await new Promise(function (resolve, reject) {
      /*
      Here is where we have to handle the year field differently. In postgresql, if we
      pass in an invalid type for year, it will throw an error - but we still want to
      search for the other fields even if the year field is invalid. 
      
      So we have to check if the year field is a number or not, and if it is, we convert
      it to an integer. If it's not, we simply alter the SQL so that it doesn't include
      the year field in the query -- because no matter the type it accepts, if the user is
      entering non-digit characters it's not going to match a year, string or not.
      Therefore, this will return the same results as the mongoDB query above.
      */

      let sql = `SELECT * from public.movies WHERE title ILIKE '${title}' OR genre ILIKE '${genre}' OR year = ${year}`;

      // If the year field is not a number, we alter the SQL query to not include the year field.
      if (isNaN(year)) {
        sql = `SELECT * from public.movies WHERE title ILIKE '${title}' OR genre ILIKE '${genre}'`;
      }

      console.log(sql);

      pgDal.query(sql, [], (err, result) => {
        if (err) {
          // logging should go here
          if (DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
      });
    });
    if (DEBUG) console.log("PostgreSQL Results: ", results);
    return results;
  }
}

module.exports = {
  getMovies,
};
