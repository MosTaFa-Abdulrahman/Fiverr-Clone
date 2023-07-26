const router = require("express").Router();
const Gig = require("../models/Gig");
const { verifyToken } = require("../utils/verifyToken");

// Create
router.post("/create", verifyToken, async (req, res) => {
  try {
    !req.isSeller && res.status(400).json("you are not seller !~!");

    const newGig = new Gig({ ...req.body, userId: req.userId });
    const savedGig = await newGig.save();
    res.status(200).json(savedGig);
  } catch (error) {
    res.status(500).json("Error Create Gig !!~");
  }
});

// Delete
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig.userId !== req.userId)
      return res.status(404).json("You can delete only your gig !~!");

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig Deleted ☻♥");
  } catch (error) {
    res.status(500).json("Error Delete Gig !!~");
  }
});

// Get Single Gig
router.get("/get/:id", async (req, res) => {
  try {
    const getGig = await Gig.findById(req.params.id);
    !getGig && res.status(404).json("Gig not found !!!");
    res.status(200).json(getGig);
  } catch (error) {
    res.status(500).json("Error Get Gig !!~");
  }
});

// Get ALL
router.get("/get", async (req, res) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };

  try {
    const getAllGigs = await Gig.find(filters).sort({ [q.sort]: -1 });
    res.status(200).json(getAllGigs);
  } catch (error) {
    res.status(500).json("Error Get ALL Gigs !!~");
  }
});

module.exports = router;
