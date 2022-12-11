const dal = require("./mdb");
const { ObjectId } = require("mongodb");

// Function used when registering new user
async function addUser(user) {
  //where is this user coming from?
  try {
    await dal.db("sprint2").collection("movies").insertOne(user);
  } catch (error) {
    console.error(error);
  }
}

async function addUser(user) {
  if (DEBUG) console.log("films.mongo.dal.addFilm()");
  try {
    await dal.connect();
    const result = await dal.db("sprint2").collection("users").insertOne(user);
    return result;
  } catch (error) {
    console.log(error);
  }
}

// Function used for authentication, Retreival of user info
async function getUserByEmail(email) {
  //could need to be user.email
  DEBUG && console.log("getUserByEmail() searching: " + email);
  try {
    const user = await dal
      .db("sprint2")
      .collection("movies")
      .findOne({ email: email });
    //Don't know if we need this:
    // global.user = user;
    if (user === null) {
      console.log("getUserByEmail() FAILED: Could not get User");
    } else {
      // global.profileIcon = user.image;
      DEBUG && console.log("getUserByEmail() SUCCESS: User Found");
      return user;
    }
  } catch (error) {
    console.error(error);
  }
}

// Function used for Passport
async function getUserById(id) {
  DEBUG && console.log("getUserById() searching: " + id);

  // Defined object parameter to pass into database query
  const par = ObjectId(`${id}`);

  try {
    const user = await dal
      .db("sprint2")
      .collection("movies")
      .findOne({ _id: par });
    DEBUG && console.log(user);

    if (user === null) {
      console.log("getUserById() FAILED: Could not get User");
    } else {
      DEBUG && console.log("getUserById() SUCCESS: User Found");
      return user;
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getUserByEmail,
  getUserById,
  addUser,
};
