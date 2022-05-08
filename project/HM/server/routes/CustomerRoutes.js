const router = require("express").Router();
const Customer = require("../models/Customer");

//  Route for customer sign up
router.post("/SignIn", async (req, res) => {

    // Get response body data.
    const { email, password } = req.body;

    // Check customer is registered
    let cus = await Customer.findOne({ email });
    if (!cus) return res.status(404).send("This email do not have any account, Please Sign Up!");

    // Check password
    const validPassword = cus.password === password;
    if (!validPassword) return res.status(404).send("Password Incorrect, Please enter valid password!");

    console.log(cus);

    customer = {
        id: cus._id,
        name: cus.name,
        email: cus.email,
        mobile: cus.mobile,
        gender: cus.gender,
        birthDate: cus.birthDate,
        imageURL: cus.imageURL,
    };
    return res.status(200).send(customer);

});

// Route for customer sign in
router.post("/SignUp", async (req, res) => {

    // Get response body data.
    const { name, email, password, mobile, gender, birthDate } = req.body;

    console.log(name);

    // Check email is already used
    const emailExist = await Customer.findOne({ email });
    if (emailExist) return res.status(404).send("Email is already registered!");

    // Upload image to server
    let image = req.files.image;
    let imageName = Date.now() + "-" + image.name;
    image.mv("./public/images/customers/" + imageName, (err, result) => {
        if (err) return res.status(400).send("Image Upload Failed!");
    });

    let imageURL = process.env.IMAGE_URL_PREFIX + "/customers/" + imageName;

    // Create new customer
    const customer = new Customer({
        name,
        email,
        password,
        mobile,
        gender,
        birthDate,
        imageURL
    });

    console.log(customer);

    try {
        const cratedCustomer = await customer.save();
        res.send(cratedCustomer);
    } catch (err) {
        res.status(400).send(err);
    }

});

// Route for delete customer
router.delete("/DeleteCustomer/:id", async (req, res) => {

    await Customer.findByIdAndDelete(req.params.id)
        .then(() => res.send("Account deleted succesfully."))
        .catch(err => res.status(400).send("Something went wrong, delete acoount again!"));

});

// Route for update customer
router.put("/UpdateCustomer/:id", async (req, res) => {

    // Get response body data.
    const { name, mobile, gender, birthDate } = req.body;

    // Upload image to server
    if (req.body.isImageChanged === "true") {

        let image = req.files.image;

        let imageName = Date.now() + "-" + image.name;
        image.mv("./public/images/customers/" + imageName, (err, result) => {
            if (err) return res.status(400).send("Image Upload Failed!");
        });

        imageURL = process.env.IMAGE_URL_PREFIX + "/customers/" + imageName;
    }

    await Customer.findById(req.params.id)
        .then(customer => {
            customer.name = name;
            customer.mobile = mobile;
            customer.gender = gender;
            customer.birthDate = birthDate;
            if (req.body.isImageChanged === "true") {
                customer.imageURL = imageURL;
            }

            customer.save()
                .then((c) => {
                    let cus = {
                        id: c._id,
                        name: c.name,
                        email: c.email,
                        mobile: c.mobile,
                        gender: c.gender,
                        birthDate: c.birthDate,
                        imageURL: c.imageURL,
                    };
                    res.send(cus)
                })
                .catch(err => res.status(400).send('Error: ' + err));
        })
        .catch(err => {
            console.log(err)
            res.status(400).send("Something went wrong, Update acoount again!")
        });

});

// Route for get all customers
router.get("/", async (req, res) => {

    await Customer.find()
        .then(customers => res.send(customers))
        .catch(err => res.status(400).send(err))

})

module.exports = router;
