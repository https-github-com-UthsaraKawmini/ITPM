const router = require("express").Router();
const Equipment = require("../models/Equipment");

router.post("/create", async (req, res) => {

    // Extract equipment data from request body
    const { name, description, price, quantity } = req.body;

    // Extract image data from request body
    let image = req.files.image;

    // Generate name for the image
    let imageName = Date.now() + "-" + image.name;

    // Move image to server host
    image.mv("./public/images/equipments/" + imageName, (err, result) => {
        if (err) return res.status(400).send("Image upload process failed!");
    });

    // Generate imageURL
    let imageURL = process.env.IMAGE_URL_PREFIX + "/equipments/" + imageName;

    // Create new equipment
    const equipment = new Equipment({
        name,
        description,
        price,
        quantity,
        imageURL
    });

    try {
        // Insert equipment to database
        await equipment.save();
        res.send("Equipment created successfully!");
    } catch (err) {
        res.status(400).send("Equipment creation failed!");
    }
});

// Get all equipments
router.get("/all", async (req, res) => {
    await Equipment.find()
        .then(equipments => {
            res.send(equipments)
        })
        .catch(err => res.status(400).send("Error in get all equipments!"))
});

// Get equipment by id
router.get("/getByID/:equipmentId", (req, res) => {
    Equipment.findById(req.params.equipmentId)
      .then((equipment) => res.send(equipment))
      .catch((err) => res.status(400).send("Equipment cannot fetch!"));
  });


// Get all equipments with quantity greater than 0
router.get("/available", async (req, res) => {
    await Equipment.find()
        .then(equipments => {
            // filter available equipments 
            let availableEquipments = [];
            equipments.map(e => {
                if(e.quantity > 0){
                    availableEquipments.push(e);
                }
            })

            res.send(availableEquipments)
        })
        .catch(err => res.status(400).send("Error in get all available equipments!"))
});

module.exports = router;