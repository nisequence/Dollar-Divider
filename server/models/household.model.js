const mongoose = require("mongoose");

const HouseholdSchema = new mongoose.Schema({
    participantIDs: {
        type: Array,
        required: false,
    },
    participantMaxNum: {
        type: Number,
        required: true,
    },
    ownerID: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Household", HouseholdSchema);