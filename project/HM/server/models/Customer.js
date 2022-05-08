const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: {
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
    mobile: {
        type: String,
        required: true,
        min: 10,
    },
    gender: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Customer", customerSchema);