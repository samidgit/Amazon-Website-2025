/* code sets up an Express.js API on Firebase Functions with Stripe for payment processing */

// it runs when an HTTP request is made
import { onRequest } from "firebase-functions/v2/https";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// const dotenv=require("dotenv")
import Stripe from "stripe";
import { setGlobalOptions } from "firebase-functions";

// Load environment variables (only needed for local development)
dotenv.config();
setGlobalOptions({maxInstances:10})
// Correct way to use Stripe with Firebase
const stripe = new Stripe(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success",
  });
});

// Firebase function export and used as listen
export const api = onRequest(app);
app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);
  if (total > 0) {
    // console.log("payment received ", total);
    // res.send(total);

    // Calls the Stripe API to create a PaymentIntent/payment process.
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    // console.log(paymentIntent);
    res.status(201).json({
      // client_secret: confirm the payment securely.
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(403).json({
      message: "the total must be greater than zero",
    });
  }
});
