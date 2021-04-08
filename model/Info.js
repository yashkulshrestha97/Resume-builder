const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infoSchema = new Schema({
  user_id: String,
  address: {
    houseNumber: String,
    street: String,
    city: String,
    state: String,
    country: String
  },
  age: Number,
  mobileNumber: Number,
  status: Boolean
}, { timestamps: true });

const Info = mongoose.model('Info', infoSchema);
module.exports = Info;