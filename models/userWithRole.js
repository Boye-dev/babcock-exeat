// Import the mongoose module
const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserWithRoleSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    userNumber: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String },
    role: { type: String, required: true },
    hall: { type: String, required: true },
  },
  { timestamps: true }
);

const UserWithRole = mongoose.model("userWithRole", UserWithRoleSchema);

module.exports = UserWithRole;
