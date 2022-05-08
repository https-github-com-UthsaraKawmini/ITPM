const router = require("express").Router();
const PurchaseHistory = require("../models/PurchaseHistory");

// Get all purchase history by user
router.get("/getByUser/:userId", async (req, res) => {
    const purchaseHistory = await PurchaseHistory.findOne({ userId: req.params.userId });
    res.send(purchaseHistory);
});

module.exports = router;