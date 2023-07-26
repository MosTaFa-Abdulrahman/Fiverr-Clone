const router = require("express").Router();
const Conversation = require("../models/Conversation");
const { verifyToken } = require("../utils/verifyToken");

// Create
router.post("/create", verifyToken, async (req, res) => {
  const newConversation = new Conversation({
    id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
    sellerId: req.isSeller ? req.userId : req.body.to,
    buyerId: req.isSeller ? req.body.to : req.userId,
    readBySeller: req.isSeller,
    readByBuyer: !req.isSeller,
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).send(savedConversation);
  } catch (error) {
    res.status(400).json("Error Create Conversation !!~");
  }
});

// Get Single Conversation
router.get("/get/:id", verifyToken, async (req, res) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    !conversation && res.status(400).json("Conversation Not Found !!~");
    res.status(200).send(conversation);
  } catch (error) {
    res.status(500).json("Error Get Single Conversation !!~");
  }
});

// GET ALL Conversations
router.get("/get", verifyToken, async (req, res) => {
  const conversations = await Conversation.find(
    req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
  ).sort({ updatedAt: -1 });
  res.status(200).send(conversations);
  try {
  } catch (error) {
    res.status(400).json("Error Get ALL Conversations !~~!");
  }
});

// Update
router.put("/update/:id", verifyToken, async (req, res) => {
  // id = sellerId + buyerId;
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      { new: true }
    );

    res.status(200).send(updatedConversation);
  } catch (error) {
    res.status(400).json("Error Update Conversation !!~");
  }
});

module.exports = router;
