const { ObjectId } = require("mongodb");
const dal = require("./mdb");

// async function getMovies() {
//   if (DEBUG) console.log("movies.mongo.dal.getMovies()");
//   try {
//     await dal.connect();
//     const cursor = dal.db("sample_mflix").collection("moviesList").find();
//     const results = await cursor.toArray();
//     return results;
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function getMoviesByMovieId(id) {
//   if (DEBUG) console.log("movies.mongo.dal.getMoviesByMovieId()");
//   try {
//     await dal.connect();
//     const result = dal
//       .db("sample_mflix")
//       .collection("moviesList")
//       .findOne({ _id: ObjectId(id) });
//     console.log(result);
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// }

async function addMovie(genres, title, rated, year) {
  if (DEBUG) console.log("movies.mongo.dal.addMovie()");
  let newLogin = JSON.parse(
    `{  "genres": "` +
      genres +
      `", "title": "` +
      title +
      `", "rated": "` +
      rated +
      `","year": "` +
      year +
      `" }`
  );
  try {
    await dal.connect();
    const result = await dal
      .db("sprint2")
      .collection("movies")
      .insertOne(newLogin);
    return result.insertedId;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getMovies,
  getMoviesByMovieId,
  addMovie,
};
