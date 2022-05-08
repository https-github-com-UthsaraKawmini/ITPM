const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 16,
    },
    userType: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
        min: 10,
    },
    address: {
        type: String,
        required: true,
        min: 6,
    },
    imageURL: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("user", userSchema);