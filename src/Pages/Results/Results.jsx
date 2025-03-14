import React, { useEffect, useState } from "react";
import LayOut from "../../components/LayOut/LayOut";
import { useParams } from "react-router";
import axios from "axios";
import { productUrl } from "../../Utils/endpoints";
import classes from "./results.module.css";
import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/Loader/Loader";

function Results() {
  const [isloading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const { categoryName } = useParams();
  // console.log(categoryName);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        // console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <LayOut>
      {isloading ? (
        <Loader />
      ) : (
        <section>
          <h1 style={{ padding: "30px" }}>Results Page</h1>
          <p style={{ padding: "30px" }}>Category / {categoryName}</p>
          <hr />
          <div className={classes.products_container}>
            {results?.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  renderAdd={true}
                />
              );
            })}
          </div>
        </section>
      )}
    </LayOut>
  );
}

export default Results;
