// 
import React, { useContext } from "react";
import { BiCart } from "react-icons/bi"; //<BiCart />
import { FaSearch } from "react-icons/fa"; //<BsSearch />
import { SlLocationPin } from "react-icons/sl";
import classes from "./header.module.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utils/firebase";

function Header() {
  const { state, dispatch } = useContext(DataContext);
  const { basket } = state;
  const { user } = state;
  console.log(user);
  // console.log(basket.length);
  const totalItem = basket?.reduce((amount, item) => {
    // return item.amount + amount;
    return item.amount + amount;
  }, 0);

  // const handleSignOut = async () => {
  //   try {
  //     await auth.signOut();
  //     setTimeout(() => console.log("User signed out successfully"), 100); // Small delay
  //   } catch (error) {
  //     console.error("Sign Out Error:", error.message);
  //   }
  // };

  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          {/* logo */}
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              {/* delivery */}
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          <div className={classes.search}>
            {/* search */}
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" id="" placeholder="Search Product" />
            {/* search icon */}
            <FaSearch size={39} />
          </div>
          <div className={classes.order_container}>
            {/* right side link */}
            <Link to="" className={classes.language}>
              <img
                src="https://cdn.pixabay.com/photo/2017/01/07/16/55/usa-1960922_640.jpg"
                alt=""
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>
            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello, {user?.email.split("@")[0]}</p>
                    <span
                      onClick={() => auth.signOut()}
                      style={{ cursor: "pointer", color: "red" }}
                    >
                      Sign Out
                    </span>
                  </>
                ) : (
                  <>
                    <p
                      style={{
                        cursor: "pointer",
                        color: "yellow",
                        fontWeight: "bold",
                      }}
                    >
                      Hello,Sign In
                    </p>
                    <span>Account & list</span>
                  </>
                )}
              </div>
            </Link>

            {/* order */}
            <Link to="/orders">
              <p>returns</p>
              <span>& Orders</span>
            </Link>
            {/* cart */}
            <Link to="/cart" className={classes.cart}>
              <div>
                <BiCart size={35} />
                {/* <span>{basket.length}</span> */}
                <span>{totalItem}</span>
              </div>
              <h3>cart</h3>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;