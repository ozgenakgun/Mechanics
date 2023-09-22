const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
    ownerEmail: {
        type: String,
        required: [true, "email can not be empty"]
    },
    date: {
        type: String,
        required: [true, "email can not be empty"]
    },
    timeSlot: {
        type: Number
    },
    totalQuota: {
        type: Number
    },
    bookedQuota: {
        type: Number
    }
});
  
const Availability = mongoose.model("Availability", availabilitySchema);
module.exports = Availability;