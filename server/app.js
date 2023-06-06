require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;

//* Requiring in Controllers
const authController = require('./controller/auth.controller');

const cors = require("cors");
const mongoose = require("mongoose");
const MONGO = process.env.MONGODB;

mongoose.connect(`${MONGO}/dollarDivider`);
const db = mongoose.connection;

// Use the above variable to trigger event listener to check connection
db.once("open", () => log(`Connected: ${MONGO}`));

// Added to allow us to accept JSON data from the body of our client
app.use(express.json());

// Allowing the app to use cors
app.use(cors());

db.once("open")

app.use(express.static(`${__dirname}/public`));
console.log('pathway: ', __dirname);

//* Routes
app.use("/auth", authController);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})
