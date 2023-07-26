const router = require("express").Router();
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const { verifyToken } = require("../utils/verifyToken");

// Create
router.post("/add", verifyToken, async (req, res) => {
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.userId,
    desc: req.body.desc,
  });

  try {
    const savedMessage = await newMessage.save();
    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMessage: req.body.desc,
        },
      },
      { new: true }
    );
    res.status(200).send(savedMessage);
  } catch (error) {
    res.status(500).json("Error ADD Message !~~!");
  }
});

// Get All Messages
router.get("/get/:id", verifyToken, async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id });
    res.status(200).send(messages);
  } catch (error) {
    res.status(500).json("Error Get All Messages !~~!");
  }
});

module.exports = router;
