const mongoose = require("mongoose");

const CommunicationLogSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  message: String,
  status: {
    type: String,
    enum: ["SENT", "FAILED", "PENDING"],
    default: "PENDING",
  },
  sentAt: Date,
});

module.exports = mongoose.model("CommunicationLog", CommunicationLogSchema);
