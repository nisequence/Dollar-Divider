const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  minBalance: {
    type: Number,
    required: false,
  },
  allocations: {
    type: Array,
    required: true,
  },
  available: {
    type: Number,
    required: true,
  },
  ownerID: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Account", AccountSchema);
