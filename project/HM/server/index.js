// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fileupload = require("express-fileupload");

dotenv.config();

// Port Number declaration
const PORT = process.env.PORT;

// DB URL declaration
const DB_URL = process.env.MONGO_DB_URL;

const app = express();

// Middleware
app.use(express.json());
app.use(fileupload());
app.use(cors());

// Import routes
const customerRoutes = require("./routes/CustomerRoutes");

// Connecting to mongo db
mongoose.connect(DB_URL, {
    useNewUrlParser: true
});

const connection = mongoose.connection;
connection.once("open", function () {
    console.log("MongoDb connection established successfully!");
});

// Use routes
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/customers', customerRoutes);

// Starting the server
app.listen(PORT, () => {
    console.log("Server is running on Port : " + PORT);
});