const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    desc: {
        type: String,
        required: true,
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
    // checking/savings
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
        required: true
    },
    base: {
        type: String,
        required: true,
    }
    
})

module.exports = mongoose.model("Transaction", TransactionSchema);