const mongoose = require("mongoose");
const schema = mongoose.Schema;

const BookSchema = new schema({
  name: String,
  genre: String,
  authorID: String,
});

module.exports = mongoose.model("Books", BookSchema);
