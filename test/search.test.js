const { getMovies } = require("../services/search.dal"); //Require function from search.dal.

require("dotenv").config(); //Configure dotenv
const dal = require("../services/mdb"); //Require mdb.js and assign it to the constant dal.

describe("Testing getMovies function", () => {
  //Describe the tests.
  // Set up the MongoDB connection to run before all tests.
  beforeAll(async () => {
    try {
      await dal.connect();
      global.userCollection = dal.db("sprint2").collection("movies");
      global.DEBUG = false;
    } catch (error) {
      console.error(error);
    }
  });

  afterAll(async () => {
    // Close the MongoDB connection after all tests are complete.
    dal.close();
  });

  test("getMovies function testing", async () => {
    //Tests getMovies function.
    const searchTerm = "Head of State"; //Set searchTerm to valid movie title that is stored in the db.
    const database = "mongodb"; //Set database to MongoDB.
    let query = await getMovies(searchTerm, database); //Send the required parameters, set above, to the getMovies function, await the results and assign them to the constant query.
    expect(query).toEqual(
      //Expect the function to return a JSON object within an array. Expect the title: within the JSON object to be the title we searched for.
      expect.arrayContaining([
        expect.objectContaining({
          title: "Head of State",
        }),
      ])
    );
  });
});
