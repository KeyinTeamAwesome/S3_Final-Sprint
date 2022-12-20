const { getLoginByEmail, addLogin } = require("../services/auth.dal"); //Import functions from auth.dal

require("dotenv").config(); //Configure dotenv
const dal = require("../services/mdb"); //Require mdb.js and assign it to the constant dal.

describe("Testing addLogin and getLoginByEmail functions", () => {
  //Describe the tests.
  // Set up the MongoDB connection to run before all tests.
  beforeAll(async () => {
    try {
      await dal.connect();
      global.userCollection = dal.db("sprint2").collection("users");
      global.DEBUG = false;
    } catch (error) {
      console.error(error);
    }
  });

  afterAll(async () => {
    // Close the MongoDB connection after all tests are complete.
    dal.close();
  });

  // Test: Add user with addUser function, and get that user with getLoginByEmail function.
  test("addLogin function testing", async () => {
    const userInfo = {
      //Add fake test data in JSON object form and asssign it to the constant userInfo.
      name: "Joe",
      email: "joe@testing.com",
      password: "555555555",
      uuidv4: "8b85f15c-f73b-46c3-ah58-c7f19e779adf",
    };
    await addLogin(
      //Call addLogin function from auth.dal and pass it the userInfo.
      userInfo.name,
      userInfo.email,
      userInfo.password,
      userInfo.uuidv4
    );
    let user = await getLoginByEmail(userInfo.email); //Call the getLoginByEmail function from auth.dal and pass it the email from userInfo.
    expect(user.email).toEqual(expect.stringMatching(userInfo.email)); //Expect the user email that comes back from getLoginFunction to match the userInfo email, which verifies addLogin was successful in adding userInfo.
  });
});
