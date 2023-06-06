const mongoose = require("mongoose");

const TransactionSchema = new mongoose.TransactionSchema({
    date: {
        type: Date,
        required: true,
    },
    desc: {
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
    checkNum: {
        type: Number,
        required: false,
    },
    manualEntry: {
        type: Boolean,
        required: true,
    },
    source: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Transaction", TransactionSchema);