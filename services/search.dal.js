const { ObjectId } = require("mongodb");
const dal = require("./mdb");

// async function getTest() {
// 	if (DEBUG) console.log("movies.mongo.dal.getMovies()");
// 	try {
// 		await dal.connect();
// 		const cursor = dal.db("s3_final_sprint").collection("movies").find();
// 		const results = await cursor.toArray();
//     console.log("RESULTS: ", results)
// 		return results;
// 	} catch (error) {
// 		console.log(error);
// 	}
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

async function getMovies(searchTerm, database) {
	if (DEBUG) console.log("getMovies() in search.dal.js");
	if (database === "mongodb") {
		let queryObj = new Object();
		queryObj["$or"] = [
			{ title: new RegExp(searchTerm) },
			{ genre: new RegExp(searchTerm) },
			{ year: Number(searchTerm) === !NaN ? parseInt(searchTerm) : searchTerm },
		];
		console.log("query: ", queryObj);

		try {
			await dal.connect();
			const cursor = await dal
				.db("s3_final_sprint")
				.collection("movies")
				.find(queryObj)
				.limit(10); // !IMPORTANT: JUST FOR TESTING PURPOSES
			const results = await cursor.toArray();
			console.log(results);
			return results;
		} catch (error) {
			console.log(error);
			// Maybe send back a 503 here as well? Not sure if I'll have to. We'll see. !REFERENCE my(kenzi) copy of Jamie's mongo-support folder
		}
	} else if (database === "postgresql") {
		if (DEBUG) console.log("getMovies() postgres selected");
	}
}

// async function putMovie(id, genres, title, rated, year) {
//   if (DEBUG) console.log("movies.mongo.dal.putMovie()");
//   try {
//     await dal.connect();
//     const result = await dal
//       .db("sample_mflix")
//       .collection("moviesList")
//       .replaceOne(
//         { _id: ObjectId(id) },
//         { genres: genres, title: title, rated: rated, year: year }
//       );
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function patchMovie(id, genres, title, rated, year) {
//   if (DEBUG) console.log("movies.mongo.dal.patchMovie()");
//   try {
//     await dal.connect();
//     const result = await dal
//       .db("sample_mflix")
//       .collection("moviesList")
//       .updateOne(
//         { _id: ObjectId(id) },
//         { $set: { genres: genres, title: title, rated: rated, year: year } },
//         { upsert: true, returnDocument: "after" }
//       );
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function deleteMovie(id) {
//   if (DEBUG) console.log("movies.mongo.dal.deleteMovie()");
//   try {
//     await dal.connect();
//     const result = dal
//       .db("sample_mflix")
//       .collection("moviesList")
//       .deleteOne({ _id: ObjectId(id) });
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// }

module.exports = {
	getMovies,
	// getMoviesByMovieId,
	// addMovie,
	// putMovie,
	// patchMovie,
	// deleteMovie,
};
