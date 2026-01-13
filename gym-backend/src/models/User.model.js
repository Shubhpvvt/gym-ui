const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["superAdmin", "gymOwner", "trainer", "user"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
