const { ObjectId } = require("mongodb");
const dal = require("./mdb");

async function getLogins() {
  try {
    await dal.connect();
    const cursor = dal.db("sprint2").collection("users").find();
    const results = await cursor.toArray();
    return results;
  } catch (error) {
    console.log(error);
  }
}
async function getLoginByUsername(name) {
  try {
    await dal.connect();
    const result = dal
      .db("sprint2")
      .collection("users")
      .findOne({ username: name });
    return result;
  } catch (error) {
    console.log(error);
  }
}
async function getLoginByEmail(email) {
  try {
    await dal.connect();
    const result = dal
      .db("sprint2")
      .collection("users")
      .findOne({ email: email });
    return result;
  } catch (error) {
    console.log(error);
  }
}
async function getLoginById(id) {
  try {
    await dal.connect();
    const result = dal
      .db("sprint2")
      .collection("users")
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function addLogin(name, email, password, uuidv4) {
  let newLogin = JSON.parse(
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
    await dal.connect();
    const result = await dal
      .db("sprint2")
      .collection("users")
      .insertOne(newLogin);
    return result.insertedId;
  } catch (error) {
    if (error.code === 11000) return error.code;
    console.log(error);
  }
}

module.exports = {
  getLogins,
  getLoginByUsername,
  addLogin,
  getLoginByEmail,
  getLoginById,
};
