const mongoose = require("mongoose");
const schema = mongoose.Schema;

const AuthorSchema = new schema({
  name: String,
  genre: String,
  authorID: String,
});

module.exports = mongoose.model("Authors", AuthorSchema);
