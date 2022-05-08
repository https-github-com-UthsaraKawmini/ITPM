const mongoose = require("mongoose");

const equipmentsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255,
    },
    equipmentId: {
        type: String,
        required: true,
        min: 4,
        max: 255,
    },
    country: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    SalesCount: {
        type: Number,
        required: true,
        min: 0,
    },
    imageURL: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Equipments", equipmentsSchema);