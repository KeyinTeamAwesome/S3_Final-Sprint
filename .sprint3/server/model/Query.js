const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const querySchema = new Schema({
  userID: {
    type: Number,
    default: 0,
  },
  searchTerm: {
    type: String,
    default: 0,
  },
});

module.exports = mongoose.model("Query", querySchema);