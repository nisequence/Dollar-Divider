const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
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
        required: false,
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
        required: false,
    },
    source: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: true,
    },
    base: {
        type: String,
        required: true,
    }
    
})

module.exports = mongoose.model("Transaction", TransactionSchema);