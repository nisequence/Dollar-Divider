const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    // Extra notes about transaction
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
    // Due Date of bill
    dueDate: {
        type: Date,
        required: true
    },
    
    recurring: {
        type: Boolean,
        required: true,
    },
    autoPay: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    nextDate: {
        type: Date,
        required: false,
    },
    base: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Bill", BillSchema);