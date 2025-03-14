import React, { useContext, useEffect, useState } from "react";
import LayOut from "../../components/LayOut/LayOut";
import classes from "./orders.module.css";
import { db } from "../../Utils/firebase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";

function Orders() {
  const { state, dispatch } = useContext(DataContext);
  const { user } = state;
  console.log(user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      //  console.log("User UID:", user.uid); // Debug user.uid
      db.collection("users")
        .doc(user.uid) // Target the user document
        .collection("orders") // Target the orders subcollection
        .orderBy("create", "desc") // Sort orders by date in descending order
        .onSnapshot((snapshot) => {
          // console.log(snapshot);
          setOrders(
            snapshot?.docs?.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <LayOut>
      <section className={classes.container}>
        {/* ordered item */}
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          {orders?.length == 0 && (
            <div style={{ padding: "20px" }}>You don't have any orders</div>
          )}
          <div>
            {orders?.map((eachOrders, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID:{eachOrders?.id}</p>
                  {eachOrders?.data?.basket?.map((order) => {
                    return (
                      <ProductCard flex={true} product={order} key={order.id} />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
