const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: [true, "Enter your e-mail address"],
    unique: [true, "This e-mail address already exists"]
  },
  password: {
    type: String,
    required: [true, "Enter a password"]
  },
  firstname: {
    type: String,
    trim: true,
    required: [true, "Enter your first name"]
  },
  lastname: {
    type: String,
    trim: true,
    required: [true, "Enter your last name"]
  },
  email_confirm: {
    type: Boolean,
    default: false,
    required: true
  },
  profile_picture: {
    type: String,
    // get: v => `${root}${v}`
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;