const { getMovies } = require("../services/search.dal");

require("dotenv").config();
const dal = require("../services/mdb");

describe("Testing getMovies function", () => {
  // Setting up db connection
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
    // Close Database here
    dal.close();
  });

  test("addLogin function testing", async () => {
    const searchTerm = "Head of State";
    const database = "mongodb";
    let query = await getMovies(searchTerm, database);
    expect(query).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "Head of State",
        }),
      ])
    );
  });
});
