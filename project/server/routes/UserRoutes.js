const router = require("express").Router();
const User = require("../models/User");

// Get all users from the database and send to admin
router.get("/", async (req, res) => {

    await User.find()
        .then(users => {
            // Go through the users list and delete the password attribute 
            updatedUserList = [];
            users.map(user => {
                u = user._doc;
                delete u.password;
                updatedUserList.push(u);
            })
            res.send(updatedUserList)
        })
        .catch(err => res.status(400).send("Get all user process failed!"))

});

router.post("/SignIn", async (req, res) => {

    // Get user from the database
    const user = await User.findOne({ email: req.body.email });

    // Check the user account
    if (!user) {
        // If in valid user
        return res.status(404).send("User account not exit!");
    } else {
        // Check the user password
        const isValidPassword = user.password === req.body.password;

        // If incorrect password
        if (!isValidPassword) {
            return res.status(403).send("Email or password incorrect!");
        }

        // Create response user
        let createdUser = {
            ...user._doc,
        };

        // Delete password attribute
        delete createdUser.password;

        return res.status(200).send(createdUser);
    }
});

router.post("/SignUp", async (req, res) => {

    // Get data from request body.
    const { userName, email, password, mobile, userType, address } = req.body;

    // Get user from the database
    const user = await User.findOne({ email: req.body.email });

    // Check the user account
    if (user) {
        // If user account exists
        return res.status(403).send("This email has an account, please sign in!");
    } else {

        // Get image from the request
        let image = req.files.image;

        // Create unique name for the image
        let imageName = Date.now() + "-" + image.name;

        // Move image to server host
        image.mv("./public/images/users/" + imageName, (err, result) => {
            if (err) return res.status(400).send("Image upload process failed!");
        });

        // Generate image URL
        let imageURL = process.env.IMAGE_URL_PREFIX + "/users/" + imageName;

        // Create new user object
        const user = new User({
            userName,
            email,
            password,
            mobile,
            userType,
            address,
            imageURL
        });

        try {
            // Save new user to database
            await user.save();
            res.send("User account successfully created!");
        } catch (err) {
            res.status(400).send("Account creation failed!");
        }
    }
});

router.put("/UpdateUser/:id", async (req, res) => {

    // Get response body data.
    const { userName, mobile, isImageUpdated, address } = req.body;

    let imageURL;

    // If user updated the image 
    if (isImageUpdated === "true") {

        // Get image from the request
        let image = req.files.image;

        // Create unique name for the image
        let imageName = Date.now() + "-" + image.name;

        // Move image to server host
        image.mv("./public/images/users/" + imageName, (err, result) => {
            if (err) return res.status(400).send("Image upload process failed!");
        });

        // Generate image URL
        imageURL = process.env.IMAGE_URL_PREFIX + "/users/" + imageName;
    }

    await User.findById(req.params.id)
        .then(user => {
            user.userName = userName;
            user.mobile = mobile;
            user.address = address;
            if (isImageUpdated === "true") {
                user.imageURL = imageURL;
            }

            user.save()
                .then((updatedUser) => {
                    let userResponse = {
                        ...updatedUser._doc,
                    };

                    // Delete password attribute
                    delete userResponse.password;
                    res.send(userResponse)
                })
                .catch(err => res.status(400).send('User account update process failed!'));
        })
        .catch(err => {
            res.status(400).send("User account update process failed!");
        });
});

router.delete("/DeleteUser/:id", async (req, res) => {
    // Find the user account in the database and delete
    await User.findByIdAndDelete(req.params.id)
        .then(() => res.send("Account successfully deleted!"))
        .catch(err => res.status(400).send("User account delete process failed!"));
});

module.exports = router;
