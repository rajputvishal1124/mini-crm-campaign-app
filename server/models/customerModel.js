const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: String,
  email: String,
  totalSpending: Number,
  lastVisit: Date,
  visits: Number,
});

module.exports = mongoose.model("Customer", CustomerSchema);
