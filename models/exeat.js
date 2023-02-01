// Import the mongoose module
const mongoose = require("mongoose");

const { Schema } = mongoose;

const ExeatSchema = new Schema(
  {
    departDate: { type: String, required: true },
    returnDate: { type: String, required: true },
    type: { type: String, required: true },
    address: { type: String, required: true },
    reason: { type: String, required: true },
    host: { type: String, required: true },
    status: { type: String, default: "Pending" },
    student: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

const Exeat = mongoose.model("exeat", ExeatSchema);

module.exports = Exeat;
