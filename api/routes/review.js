const router = require("express").Router();
const Review = require("../models/Review");
const Gig = require("../models/Gig");
const { verifyToken } = require("../utils/verifyToken");

// Create
router.post("/create", verifyToken, async (req, res) => {
  if (req.isSeller) res.status(403).json("Seller Can not create a Review !!~");

  const newReview = new Review({
    userId: req.userId,
    gigId: req.body.gigId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const review = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });
    review &&
      res.status(403).json("You have already created a review for this gig !~");

    const savedReview = await newReview.save();
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(200).json(savedReview);
  } catch (error) {
    res.status(500).json("Error Create Review !!~");
  }
});

// Get All Reviews
router.get("/get/:gigId", async (req, res) => {
  try {
    const getAllReviews = await Review.find({ gigId: req.params.gigId });
    res.status(200).json(getAllReviews);
  } catch (error) {
    res.status(500).json("Error GET ALL Reviews !!~");
  }
});

// Delete
router.delete("/delete/:reviewId", async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.reviewId);
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: -1 },
    });
    res.status(200).json("Review Deleted ☻♥");
  } catch (error) {
    res.status(500).json("Error Delete Review !!~");
  }
});

module.exports = router;
