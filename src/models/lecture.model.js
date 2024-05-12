const { Schema, model } = require("mongoose");
let lectureSchema = new Schema({
  Name: String,
  Level: String,
  Description: String,
  Image: String,
});

let Lecture = model("Lecture", lectureSchema);

module.exports = Lecture;
