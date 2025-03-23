const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, // ✅ Trim spaces
    price: { type: Number, required: true, min: 0 }, // ✅ No negative price
    description: { type: String, required: true, trim: true },
    icon: { type: String, default: "🛠️", trim: true }, // ✅ Trim spaces
  },
  { timestamps: true } // ✅ Auto-adds createdAt & updatedAt
);

module.exports = mongoose.model("Service", ServiceSchema);
