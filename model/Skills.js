const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillsSchema = new Schema({
  user_id: String,
  skills: String,
  hobbies: String,
  status: Boolean
}, { timestamps: true });

const Skills = mongoose.model('Skills', skillsSchema);
module.exports = Skills;