const mongoose = require("mongoose");

const gigSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    cat: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    cover: { type: String, required: true },
    shortTitle: { type: String, required: true },
    shortDesc: { type: String, required: true },
    images: { type: [String], required: false },
    features: { type: [String], required: false },
    totalStars: { type: Number, default: 0 },
    starNumber: { type: Number, default: 0 },
    price: { type: Number, required: true },
    deliveryTime: { type: Number, required: true },
    revisionNumber: { type: Number, required: true },
    sales: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("gig", gigSchema);
