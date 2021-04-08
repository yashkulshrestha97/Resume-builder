const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const educationSchema = new Schema({
  user_id: String,
  institution_name: String,
  percentage: Number,
  degree: String,
  yop: Number
}, { timestamps: true });

const Education = mongoose.model('Education', educationSchema);
module.exports = Education;