require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;

//* Requiring in Controllers
const userController = require('./controller/user.controller');
const householdController = require('./controller/household.controller');

//* Middleware
//!const validation = require("./helpers/validate-session")

const cors = require("cors");
const mongoose = require("mongoose");
const MONGO = process.env.MONGODB;

mongoose.connect(`${MONGO}/dollarDivider`);
const db = mongoose.connection;

// Use the above variable to trigger event listener to check connection
db.once("open", () => console.log(`Connected: ${MONGO}`));

// Added to allow us to accept JSON data from the body of our client
app.use(express.json());

// Allowing the app to use cors
app.use(cors());

//* Routes
app.use("/user", userController);
app.use("/household", householdController);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})
