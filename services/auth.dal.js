const dal = require("./mdb"); //Import mdb.js and assign it to the constant dal.

async function getLogins() {
  //Function to get all the user information from MongoDB
  try {
    await dal.connect(); //Wait for the database to connect.
    const cursor = await dal.db("sprint2").collection("users").find(); //Specify the database and collection names and find().
    const results = await cursor.toArray(); //Wait for the array and assign the returned results to the constant results.
    return results; //Return results.
  } catch (error) {
    console.log(error); //If error, console.log error.
  }
}

async function getLoginByEmail(email) {
  //Function to search for a user's information via their email in MongoDB.
  try {
    await dal.connect();
    const result = await dal //Wait for the database to connect.
      .db("sprint2")
      .collection("users")
      .findOne({ email: email }); //Specify the database and collection names and pass findOne() the email address to search for in MongoDB. Assign the returned results to the constant result.
    if (DEBUG)
      console.error("mlogins.getLoginByEmail(" + email + "): " + result); //Log the result to the console.
    return result; //Return result.
  } catch (error) {
    console.log(error); //If error, console.log error.
  }
}

async function getLoginById(id) {
  //Function to search for a user's information via id in MongoDB.
  try {
    await dal.connect(); //Wait for the database to connect.
    const result = await dal //Specify the database and collection names and pass find() the id to search for in MongoDB. Assign the returned results to the constant result.
      .db("sprint2")
      .collection("users")
      .find({ _id: id });
    if (DEBUG) console.error("mlogins.getLoginById(" + id + "): " + result); //Log the result to the console.
    return result; //Return result.
  } catch (error) {
    console.log(error); //If error, console.log error.
  }
}

async function addLogin(name, email, password, uuidv4) {
  //Function to add a new user to MongoDB. Takes the parameters name, email, password, and uuidv4.
  let newLogin = JSON.parse(
    //JSON parse the parameters and assign to constant newLogin.
    `{ "username": "` +
      name +
      `", "email": "` +
      email +
      `", "password": "` +
      password +
      `", "uuid": "` +
      uuidv4 +
      `" }`
  );
  try {
    await dal.connect(); //Wait for the database to connect.
    const result = await dal //Specify the database and collection names and pass insertOne the newLogin to add in MongoDB. Assign the returned results to the constant result.
      .db("sprint2")
      .collection("users")
      .insertOne(newLogin);
    return result.insertedId; //Return the resulting id.
  } catch (error) {
    console.log(error); //If error, console.log error.
  }
}

module.exports = {
  //Export the functions.
  getLogins,
  addLogin,
  getLoginByEmail,
  getLoginById,
};
