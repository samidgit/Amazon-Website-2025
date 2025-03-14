import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import classes from "./header.module.css";
function LowerHeader() {
  return (
    <div className={classes.lower_container}>
      <ul>
        <li>
          <AiOutlineMenu />
          <p>ALL</p>
        </li>
        <li> Today's Deal</li>
        <li>Costumer Service</li>
        <li>Registry</li>
        <li>Gift Card</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader;
