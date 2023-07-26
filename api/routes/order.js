const router = require("express").Router();
const Gig = require("../models/Gig");
const Order = require("../models/Order");
const { verifyToken } = require("../utils/verifyToken");
const stripe = require("stripe")(
  "sk_test_51LNo35G2b2rR7T8Z4L1HIotQWWI6YQG1YTxcGyFwH1NTJKbcpGlF3bSliELRioS4xq14RytZKBMClrpwqAnzYC7f00cxULuB4O"
);

// Create Payment
router.post("/create-payment-intent/:gigId", verifyToken, async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: gig.price * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const newOrder = new Order({
      gigId: gig._id,
      sellerId: gig.userId,
      buyerId: req.userId,
      img: gig.cover,
      title: gig.title,
      price: gig.price,
      payment_intent: paymentIntent.id,
    });

    await newOrder.save();
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json("Error Payment !!~!!");
  }
});

// Gonfirm Order
router.put("/confirm", verifyToken, async (req, res) => {
  try {
    await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).send("Order has been confirmed 😍 🥰");
  } catch (error) {
    res.status(500).json("Error Confirm Order !~~!");
  }
});

// GET ALL Orders
router.get("/get", verifyToken, async (req, res) => {
  try {
    const getAllOrders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });
    res.status(200).json(getAllOrders);
  } catch (error) {
    res.status(500).json("Error Get ALL Orders !~~!");
  }
});

// Create Order For ((Test))
// router.post("/create/:gigId", verifyToken, async (req, res) => {
//   try {
//     const gig = await Gig.findById(req.params.gigId);
//     const newOrder = new Order({
//       gigId: gig._id,
//       sellerId: gig.userId,
//       buyerId: req.userId,
//       img: gig.cover,
//       title: gig.title,
//       price: gig.price,
//       payment_intent: "temprory",
//     });

//     await newOrder.save();
//     res.status(200).json("Successful Order ☻♥");
//   } catch (error) {
//     res.status(500).json("Error Create Order !!~");
//   }
// });

module.exports = router;
