const dal = require("./mdb");

async function getLogins() {
  try {
    await dal.connect();
    const cursor = await dal.db("sprint2").collection("users").find();
    const results = await cursor.toArray();
    return results;
  } catch (error) {
    console.log(error);
  }
}
async function getLoginByEmail(email) {
  try {
    await dal.connect();
    const result = await dal
      .db("sprint2")
      .collection("users")
      .findOne({ email: email });
    if (DEBUG)
      console.error("mlogins.getLoginByEmail(" + email + "): " + result);
    return result;
  } catch (error) {
    console.log(error);
  }
}
async function getLoginById(id) {
  try {
    await dal.connect();
    const result = await dal
      .db("sprint2")
      .collection("users")
      .find({ _id: id });
    if (DEBUG) console.error("mlogins.getLoginById(" + id + "): " + result);
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
    console.log(error);
  }
}

module.exports = {
  getLogins,
  addLogin,
  getLoginByEmail,
  getLoginById,
};
