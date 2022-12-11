const dal = require("mdb");
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

// Middleware functions to allow/block access to routes

// Used to block unathunticated users (app content e.g. homepage)
// function checkAuthenticated(req, res, next) {
//   // If user is authenticated this will allow request
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   // If user is not authenticated re-route to login
//   res.redirect("/users/login");
// }
//MAY NOT NEED
// Used to block athunticated users (e.g. login, register)
// function checkNotAuthenticated(req, res, next) {
//   // If user is authenticated re-route to homepage
//   if (req.isAuthenticated()) {
//     return res.redirect("/");
//   }
//   // If user is not authenticated allow request
//   next();
// }

module.exports = {
  getUserByEmail,
  getUserById,
  addUser,
  checkAuthenticated,
  checkNotAuthenticated,
};
