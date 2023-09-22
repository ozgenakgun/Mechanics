const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, "email can not be empty"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "password cannot be empty"]
    }
});
  
const Admins = mongoose.model("Admins", adminSchema);
module.exports = Admins;