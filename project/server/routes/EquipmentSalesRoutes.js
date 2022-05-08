const router = require("express").Router();
const Equipments = require("../models/Equipments");

// Route for get all Equipments
router.get("/", async (req, res) => {

    await Equipments.find()
        .then(equipments => res.send(equipments))
        .catch(err => res.status(400).send(err))

})

// Route for create Equipments
router.post("/CreateEquipment", async (req, res) => {


    // Get response body data.
    const { name, equipmentId, country, SalesCount } = req.body;

    // // Check Equipments is already created
    const equipmentsExist = await Equipments.findOne({ equipmentId });
    if (equipmentsExist) return res.status(404).send("Equipment is already added!");

    // Upload image to server
    let image = req.files.image;
    let imageName = Date.now() + "-" + image.name;
    image.mv("./public/images/equipment/" + imageName, (err, result) => {
        if (err) return res.status(400).send("Image Upload Failed!");
    });

    let imageURL = process.env.IMAGE_URL_PREFIX + "/equipments/" + imageName;

    const equipment = new Equipments({
        name,
        equipmentId,
        country,
        SalesCount,
        imageURL
    });

    try {
        const createdEquipment = await equipment.save();
        res.send(createdEquipment);
    } catch (err) {
        res.status(400).send(err);
    }

});

// Route for update Equipments
router.put("/UpdateEquipment/:id", async (req, res) => {

    const { name, equipmentId, country, SalesCount } = req.body;

    let imageURL;
    if (req.body.isImageChanged === "true") {

        // Upload image to server
        let image = req.files.image;
        let imageName = Date.now() + "-" + image.name;
        image.mv("./public/images/equipment/" + imageName, (err, result) => {
            if (err) return res.status(400).send("Image Upload Failed!");
        });

        imageURL = process.env.IMAGE_URL_PREFIX + "/equipments/" + imageName;
    }

    await Equipments.findById(req.params.id)
        .then(equipments => {

            equipments.name = name;
            equipments.equipmentId = equipmentId;
            equipments.country = country;
            equipments.SalesCount = SalesCount;
            if (req.body.isImageChanged === "true") {
                Equipments.imageURL = imageURL;
            }

            Equipments.save()
                .then(() => res.send("Equipment Updated Successfully!"))
                .catch(err => res.status(400).send("Something went wrong, update Equipment again!"));
        })
        .catch(err => res.status(400).send("Something went wrong, update Equipment again!"));

});

// Route for delete Equipments
router.delete("/DeleteEquipments/:id", async (req, res) => {

    await Equipments.findByIdAndDelete(req.params.id)
        .then(() => res.send("Equipment deleted succesfully."))
        .catch(err => res.status(400).send("Something went wrong, delete Equipment again!"));

});

module.exports = router;
