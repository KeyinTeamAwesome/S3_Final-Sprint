const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  id: {
    type: Number,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  genre: {
    type: String,
    require: true
  },
  year: {
    type: Number,
    require: true,
  }
});

module.exports = mongoose.model("Movie", movieSchema);