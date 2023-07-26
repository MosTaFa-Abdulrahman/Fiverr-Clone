const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { verifyToken } = require("../utils/verifyToken");

// Update
router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(400).json("Error Update User !!~");
  }
});

// Delete
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User Deleted ☻♥");
  } catch (error) {
    res.status(400).json("Error Delete User !!~");
  }
});

// Get
router.get("/get/:id", async (req, res) => {
  try {
    const getUser = await User.findById(req.params.id);
    res.status(200).json(getUser);
  } catch (error) {
    res.status(400).json("Error Update User !!~");
  }
});

module.exports = router;
