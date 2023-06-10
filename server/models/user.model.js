const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String, // What datatype this is expecting
        required: true, // default is false
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // only one account per email address
    },
    password: {
        type: String,
        required: true,
    },
    householdID: {
        type: String,
        required: false,
    }
})

module.exports = mongoose.model("User", UserSchema);