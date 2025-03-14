import React, { useContext } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import LayOut from "../../components/LayOut/LayOut";
// import ProductCard from "../../components/ProductCard/ProductCard";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { Type } from "../../Utils/action.type";
import { Link } from "react-router";
import classes from "./cart.module.css";

function Cart() {
  const { state, user, dispatch } = useContext(DataContext);
  const { basket } = state;
  // console.log(basket.length);
  const total = basket.reduce((amount, item) => {
    // return item.price + amount;//this means
    //item.price express single item price
    //item.amount express the quantity of the item

    return item.price * item.amount + amount;
  }, 0);

  const increment = (item) => {
    dispatch({ type: Type.ADD_TO_BASKET, item });
  };
  const decrement = (id) => {
    dispatch({ type: Type.REMOVE_FROM_BASKET, id });
  };

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your shop basket</h3>
          <hr />

          {basket?.length === 0 ? (
            <p>Opps ! no item in your cart</p>
          ) : (
            basket?.map((item, index) => (
              <section className={classes.cart_product}>
                <div className={classes.myproduct}>
                  <ProductCard
                    key={index}
                    product={item}
                    renderDescr={true}
                    flex={true}
                    renderAdd={false}
                  />
                </div>
                <div className={classes.btn_container}>
                  <button
                    className={classes.btn}
                    onClick={() => increment(item)}
                  >
                    <IoIosArrowUp size={20} />
                  </button>
                  <span>{item.amount}</span>
                  <button
                    className={classes.btn}
                    onClick={() => decrement(item.id)}
                  >
                    <IoIosArrowDown size={20} />
                  </button>
                </div>
              </section>
            ))
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={classes.sub_total}>
            <div>
              <p>Subtotal ({basket?.length}items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/Payments">Continue to checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;
