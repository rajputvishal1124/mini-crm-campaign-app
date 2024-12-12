// models/Audience.js
const mongoose = require("mongoose");

const AudienceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  conditions: [
    {
      field: String,
      operator: String,
      value: String,
    },
  ],
  size: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Audience", AudienceSchema);
