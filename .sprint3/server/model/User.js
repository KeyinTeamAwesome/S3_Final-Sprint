const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userID: {
    type: Number,
    default: 0,
  },
  username: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("User", prefSchema);