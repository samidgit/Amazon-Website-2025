import React, { useContext, useState } from "react";
import LayOut from "../../components/LayOut/LayOut";
import classes from "./payment.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { useNavigate } from "react-router";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utils/firebase";

function Payment() {
  const { state, dispatch } = useContext(DataContext);
  const [processing, setProcessing] = useState(false);
  const { basket, user } = state;
  // total item
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  // total price
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [cardError, setCardError] = useState(null);

  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    // backend or function => contact to the client secret
    try {
      setProcessing(true);
      const response = await axiosInstance({
        method: "post",
        url: `/payment/create?total=${total * 100}`,
      });
      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;
      //client side or react confirmations
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // console.log(paymentIntent);
      //after confirmation =>order firestore database save,clear basket
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          create: paymentIntent.created,
        });
      // empty basket if
      dispatch({ type: "EMPTY_BASKET" });
      // navigate to orders page with success message
      navigate("/orders", { state: { msg: "Order placed successfully" } });
      setProcessing(false);

      navigate("/orders", { state: { msg: "You have placed new orders" } });
      setProcessing(false);
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* header */}
      <div className={classes.payment_header}>CheckOut ({totalItem}) items</div>
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React lane</div>
            <div>Addis Ababa</div>
          </div>
        </div>
        <hr />
        {/* product */}

        <div className={classes.flex}>
          <h3>Review item and delivery </h3>
          <div>
            {basket?.map((item, index) => (
              <ProductCard product={item} flex={true} key={index} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card */}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />{" "}
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;

// import React from 'react'

// export default function Payment() {
//   return (
//     <div>
//       hello
//     </div>
//   )
// }
