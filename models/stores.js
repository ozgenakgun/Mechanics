const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "account name cannot be empty"]
    },
    email: {
        type: String,
        required: [true, "email can not be empty"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password cannot be empty"]
    },
    phoneNumber: {
        type: String
    },
    supName: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    province: {
        type: String
    },
    postalCode: {
        type: String
    },
    description: {
        type: String
    },
    facebook: {
        type: String
    },
    instagram: {
        type: String
    },
    service: {
        type: Array
    },
    defaultQuota: {
        type: Number
    },
    imgurl: {
        type: String
    }
});
  
const Stores = mongoose.model("Stores", storeSchema);
module.exports = Stores;