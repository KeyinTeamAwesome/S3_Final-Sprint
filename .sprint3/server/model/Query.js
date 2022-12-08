const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const querySchema = new Schema({
  searchTerms: {
    type: String,
    require: true,
  },
  database: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Query", querySchema);