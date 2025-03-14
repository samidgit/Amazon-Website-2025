import React from "react";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import Rating from "@mui/material/Rating";
import classes from "./product.module.css";
import { Link } from "react-router";
import { DataContext } from "../DataProvider/DataProvider";
import { useContext } from "react";
import { Type } from "../../Utils/action.type";

function ProductCard({ product, flex, renderDescr, renderAdd }) {
  const { image, title, id, rating, price, description } = product;
  // console.log("ID is:", product.id);
  // console.log("image is :", product.image);
  const { state, dispatch } = useContext(DataContext);
  // console.log(state);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description,
      },
    });
  };

  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      } `}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h4>{title}</h4>
        {renderDescr && <div style={{ maxWidth: "750px" }}>{description}</div>}
        <div className={classes.rating}>
          <Rating value={rating?.rate} precision={0.1} />
          <small>{rating?.count}</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            add to carts
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
