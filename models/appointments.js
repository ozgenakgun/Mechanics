const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    clientEmail: {
        type: String,
        required: [true, "client email can not be empty"]
    },
    storeEmail: {
        type: String,
        required: [true, "store email can not be empty"]
    },
    storeName: {
        type: String
    },
    clientName: {
        type: String
    },
    clientPhoneNum: {
        type: String
    },
    day: {
        type: String
    },
    timeSlot: {
        type: Number
    },
    carMake: {
        type: String
    },
    carModel: {
        type: String
    },
    carYear: {
        type: Number
    },
    carMileage: {
        type: Number
    },
    carTransmission: {
        type: String
    },
    carDrivetrain: {
        type: String
    },
    problemCate: {
        type: String
    },
    problemDesc: {
        type: String
    },
    apptStatus: {
        type: String
    },
    cancelledByStore: {
        type: Boolean
    },
    cancelledByClient: {
        type: Boolean
    }
});
  
const Appointments = mongoose.model("Appointments", appointmentSchema);
module.exports = Appointments;