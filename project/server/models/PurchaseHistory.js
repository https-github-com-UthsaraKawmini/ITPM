const mongoose = require("mongoose");

const purchaseHistorySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    purchasedItems: [
        {
            equipmentID: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 0
            },
            price: {
                type: Number,
                required: true,
                min: 0
            },
            imageURL: {
                type: String,
                required: true,
            },
        },
    ],
});

module.exports = mongoose.model("purchaseHistory", purchaseHistorySchema);