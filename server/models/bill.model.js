const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
    title: {
        type: String,
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
    // Paid/ Unpaid
    active: {
        type: Boolean,
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
    category: {
        type: String,
        required: true
    },
    //! Can only a admin post bill?
    password: {
        type: String,
        required: false,
    },
    //! What does this mean?
    nextDate: {
        type: Date,
        required: false,
    },
})

module.exports = mongoose.model("Bill", BillSchema);