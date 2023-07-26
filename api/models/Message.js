const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    conversationId: { type: String, required: true },
    userId: { type: String, required: true },
    desc: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", messageSchema);
