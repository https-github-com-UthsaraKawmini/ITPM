const router = require("express").Router();
const Employee = require("../models/Employee");

// Route for get all employees
router.get("/", async (req, res) => {

    await Employee.find()
        .then(employee => res.send(employee))
        .catch(err => res.status(400).send(err))

})

// Route for delete employee
router.delete("/DeleteEmployee/:id", async (req, res) => {

    await Employee.findByIdAndDelete(req.params.id)
        .then(() => res.send("Employee deleted succesfully."))
        .catch(err => res.status(400).send("Something went wrong, delete employee again!"));

});

// Route for create employee
router.post("/CreateEmployee", async (req, res) => {

    console.log(req.files);

    // Get response body data.
    const { name, email, mobile, gender, birthDate, joinDate, salary } = req.body;

    // Check email is already used
    const emailExist = await Employee.findOne({ email });
    if (emailExist) return res.status(404).send("Employeee is already added!");

    // Upload image to server
    let image = req.files.image;
    let imageName = Date.now() + "-" + image.name;
    image.mv("./public/images/employees/" + imageName, (err, result) => {
        if (err) return res.status(400).send("Image Upload Failed!");
    });

    let imageURL = process.env.IMAGE_URL_PREFIX + "/employees/" + imageName;

    // Create new employee db object
    const employee = new Employee({
        name,
        email,
        mobile,
        gender,
        birthDate,
        joinDate,
        salary,
        imageURL
    });

    try {
        const createdEmployee = await employee.save();
        res.send(createdEmployee);
    } catch (err) {
        res.status(400).send(err);
    }

});

// Route for update employee
router.put("/UpdateEmployee/:id", async (req, res) => {

    const { name, email, mobile, gender, birthDate, joinDate, salary } = req.body;


    let imageURL;
    if (req.body.isImageChanged === "true") {

        // Upload image to server
        let image = req.files.image;
        let imageName = Date.now() + "-" + image.name;
        image.mv("./public/images/employees/" + imageName, (err, result) => {
            if (err) return res.status(400).send("Image Upload Failed!");
        });

        imageURL = process.env.IMAGE_URL_PREFIX + "/employees/" + imageName;
    }

    await Employee.findById(req.params.id)
        .then(employee => {

            employee.name = name;
            employee.email = email;
            employee.mobile = mobile;
            employee.gender = gender;
            employee.birthDate = birthDate;
            employee.joinDate = joinDate;
            employee.salary = salary;
            if (req.body.isImageChanged === "true") {
                employee.imageURL = imageURL;
            }

            employee.save()
                .then(() => res.send("Employee Updated Successfully!"))
                .catch(err => res.status(400).send("Something went wrong, upadte employee again!"));
        })
        .catch(err => res.status(400).send("Error : " + err));

});




module.exports = router;
