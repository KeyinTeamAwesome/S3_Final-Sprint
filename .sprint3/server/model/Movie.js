const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  id: {
    type: Number,
    default: 0,
  },
  movie: {
    type: String,
    require: true,
  },
  genre: {
    type: String,
    require: true
  },
  year: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model("Movie", movieSchema);