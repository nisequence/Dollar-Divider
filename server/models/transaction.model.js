const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    month: {
        type: String,
        required: true,
    },
    day: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
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
    finAccount: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    base: {
        type: String,
        required: true,
    },
    ownerID: {
        type: String,
        required: true,
    },
    billID: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model("Transaction", TransactionSchema);