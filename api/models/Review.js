const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    gigId: { type: String, required: true },
    userId: { type: String, required: true },
    desc: { type: String, required: true },
    star: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("review", reviewSchema);
