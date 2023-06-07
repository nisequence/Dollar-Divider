const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        required: false,
    },
    merchant: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    },
    nextDate: {
        type: Date,
        required: false,
    },
    recurring: {
        type: Boolean,
        required: true,
    }
})

module.exports = mongoose.model("Bill", BillSchema);