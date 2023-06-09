const mongoose = require("mongoose");

const HouseholdSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    participantIDs: {
        type: Array,
        required: true,
    },
    participantNames: {
        type: Array,
        required: true,
    },
    participantMaxNum: {
        type: Number,
        required: true,
    },
    bannedUsers: {
        type: Array,
        required: false,
    },
    admin_id: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Household", HouseholdSchema);