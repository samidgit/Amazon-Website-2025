import React from "react";
import { Routes, Route } from "react-router";
import Landing from "./Pages/Landing/Landing";
import Payment from "./Pages/Payment/Payment";
import SignUp from "./Pages/Auth/Auth";
import Cart from "./Pages/Cart/Cart";
import Orders from "./Pages/Orders/Orders";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
// protected
const stripePromise = loadStripe(
  "pk_test_51R0aqSG0Q2APUPC3H7QUAWZDpywup0ignn8C32YqSNz0h5Cyj5wSlNOTWulTYvvLKykE5drXnzyLk7776npDUAh700MzaQitba"
);

function Routing() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<SignUp />} />
        <Route
          path="/Payments"
          element={
            <ProtectedRoute
              msg={"You must login to pay"}
              redirect={"/Payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"You must login to see your orders"}
              redirect={"/orders"}
            >
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default Routing;
