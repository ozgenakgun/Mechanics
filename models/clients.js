const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, "email can not be empty"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "password cannot be empty"]
    },
    name: {
      type: String,
      required: [true, "account name cannot be empty"]
    },
    phoneNumber: {
      type: String
    },
    surName: {
      type: String
    }
});
  
const Clients = mongoose.model("Clients", clientSchema);
module.exports = Clients;