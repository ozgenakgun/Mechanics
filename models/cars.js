const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    ownerEmail: {
      type: String,
      required: [true, "owner email can not be empty"]
    },
    make: {
      type: String
    },
    model: {
      type: String
    },
    year: {
      type: Number
    },
    mileage: {
      type: Number
    },
    transmission: {
      type: String
    },
    drivetrain: {
      type: String
    }
});
  
const Cars = mongoose.model("Cars", carSchema);
module.exports = Cars;