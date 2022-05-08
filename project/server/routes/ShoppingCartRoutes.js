const router = require("express").Router();
const ShoppingCart = require("../models/ShoppingCart");
const PurchaseHistory = require("../models/PurchaseHistory");
const Equipment = require("../models/Equipment");

router.post("/addItem/:userId", async (req, res) => {

    // Extract equipment data from request body
    const { equipmentID, name, quantity, price, imageURL } = req.body;

    // Check shopping cart crated status
    let shoppingCart = await ShoppingCart.findOne({ userId: req.params.userId });

    if (shoppingCart) {
        shoppingCart.cartItems.push({
            equipmentID,
            name,
            quantity,
            price,
            imageURL,
        })
    } else {
        shoppingCart = new ShoppingCart({
            userId: req.params.userId,
            cartItems: [{
                equipmentID,
                name,
                quantity,
                price,
                imageURL,
            }]
        })
    }

    try {
        // Insert equipment to database
        await shoppingCart.save();
        res.send("Equipment added to cart successfully!");
    } catch (err) {
        console.log(err);
        res.status(400).send("Adding cart item failed!");
    }
});

router.delete("/removeItem/:userId/:equipmentID", async (req, res) => {

    // Check shopping cart crated status
    let shoppingCart = await ShoppingCart.findOne({ userId: req.params.userId });

    // Remove the cart item
    shoppingCart.cartItems = shoppingCart.cartItems.filter(item => item.equipmentID !== req.params.equipmentID);

    try {
        // Insert equipment to database
        await shoppingCart.save();
        res.send("Equipment removed from the cart successfully!");
    } catch (err) {
        res.status(400).send("Remove cart item failed!");
    }
});

router.put("/updateItem/:userId", async (req, res) => {

    // Extract equipment data from request body
    const { equipmentID, quantity } = req.body;

    // Check shopping cart created status
    let shoppingCart = await ShoppingCart.findOne({ userId: req.params.userId });

    // Update the quantity of the cart item
    shoppingCart.cartItems.map(item => {
        if (item.equipmentID === equipmentID) {
            item.quantity = quantity
        }
    });

    try {
        // Insert equipment to database
        await shoppingCart.save();
        res.send("Cart item updated successfully!");
    } catch (err) {
        res.status(400).send("Update cart item failed!");
    }
});

// Get shopping cart by user
router.get("/getByUser/:userId", async (req, res) => {
    const shoppingCart = await ShoppingCart.findOne({ userId: req.params.userId });
    res.send(shoppingCart);
});

// Checkout the cart 
router.post("/checkout/:userId", async (req, res) => {

    // Get the user shopping cart
    let shoppingCart = await ShoppingCart.findOne({ userId: req.params.userId });

    // If cart available
    if (shoppingCart) {

        // Get the user purchase history
        let purchaseHistory = await PurchaseHistory.findOne({ userId: req.params.userId });

        // If previously purchase history available
        if (purchaseHistory) {
            // add shopping cart items to purchase history
            shoppingCart.cartItems.map(item => {
                purchaseHistory.purchasedItems.push({
                    equipmentID: item.equipmentID,
                    quantity: item.quantity,
                    price: item.price,
                    imageURL: item.imageURL,
                    name: item.name
                })
            })
        } else {
            // Create the purchase history and add cart items to it 
            purchaseHistory = new PurchaseHistory({
                userId: req.params.userId,
                purchasedItems: shoppingCart.cartItems
            })
        }

        // Update the equipment amount
        await Promise.all(shoppingCart.cartItems.map(async (item) => {
            try {
                // Get the equipment by id
                let equipment =  await Equipment.findById(item.equipmentID);
                if(equipment){
                    // If quantity available
                    if(equipment.quantity - item.quantity >= 0){
                        equipment.quantity = equipment.quantity -item.quantity;
                        await equipment.save();
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }));

        // Clear the shopping cart
        shoppingCart.cartItems = [];
        try {
            // Update the cart and the purchase history
            await shoppingCart.save();
            await purchaseHistory.save();
            res.send("Cart Checkout successfully completed!");
        } catch (err) {
            res.status(400).send("Cart checkout failed!" + err);
        }
    }
});

module.exports = router;