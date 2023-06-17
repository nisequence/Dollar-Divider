require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;

//* Requiring in Controllers
const userController = require("./controller/user.controller");
const householdController = require("./controller/household.controller");
const budgetController = require("./controller/budget.controller");

//* Middleware
const requireValidation = require("./middleware/validate-session");

const cors = require("cors");
const mongoose = require("mongoose");
const MONGO = process.env.MONGODB;

mongoose.connect(`${MONGO}`);

const db = mongoose.connection;

// Use the above variable to trigger event listener to check connection
db.once("open", () => console.log(`Connected: ${MONGO}`));

// Added to allow us to accept JSON data from the body of our client
app.use(express.json());

// Allowing the app to use cors
app.use(cors());

//* Routes
app.use("/user", userController);

// Require jwt validation for all controllers below this point
app.use(requireValidation);

app.use("/household", householdController);

app.use("/budget", budgetController);

//* App Listening
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
