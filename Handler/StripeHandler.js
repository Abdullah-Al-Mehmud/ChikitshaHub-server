const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const StripeSchema = require('../Schema/StripeSchema');
// const Stripe = new mongoose.model('Stripe', StripeSchema);
const stripeKey = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  // console.log(process.env.STRIPE_SECRET_KEY)
  try {
    const { price } = req.body;
    const amount = parseInt(price * 100);

    const paymentIntent = await stripeKey.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    // console.log(paymentIntent);
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ msg: "unable to get stripe data" });
  }
});

module.exports = router;
