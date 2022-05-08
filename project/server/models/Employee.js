const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
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
    joinDate: {
        type: Date,
        required: true,
    },
    designation: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    salary: {
        type: Number,
        required: true,
        min: 0,
    },
    imageURL: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Employee", employeeSchema);