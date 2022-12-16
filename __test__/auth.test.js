const { getLoginByEmail, addLogin } = require("../services/auth.dal");

require("dotenv").config();
const dal = require("../services/mdb");

describe("Testing on some functions", () => {
  // Setting up db connection
  beforeAll(async () => {
    try {
      // const app = require("../server");
      await dal.connect();
      global.userCollection = dal.db("sprint2").collection("users");
      global.DEBUG = false;
    } catch (error) {
      console.error(error);
    }
  });

  afterAll(async () => {
    // Close Database here
    dal.close();
  });

  // Running tests below
  test("addLogin function testing", async () => {
    //Test Criteria 1
    const userInfo = {
      name: "Joe",
      email: "joe@testing.com",
      password: "555555555",
      uuidv4: "8b85f15c-f73b-46c3-ah58-c7f19e779adf",
    };
    await addLogin(
      userInfo.name,
      userInfo.email,
      userInfo.password,
      userInfo.uuidv4
    );
    let user = await getLoginByEmail(userInfo.email);
    expect(user.email).toEqual(expect.stringMatching(userInfo.email));
  });
});
