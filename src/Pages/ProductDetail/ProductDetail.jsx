import React from "react";
import LayOut from "../../components/LayOut/LayOut";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { productUrl } from "../../Utils/endpoints";
import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/Loader/Loader";

function ProductDetail() {
  const [isloading, setLoading] = useState(false);
  const [results, setResults] = useState({});
  const { productId } = useParams();
  console.log(productId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${productUrl}/products/${productId}`);
        setResults(response.data);
        // console.log(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <LayOut>
      {isloading ? (
        <Loader />
      ) : (
        <div>
          <ProductCard
            product={results}
            flex={true}
            renderDescr={true}
            renderAdd={true}
          />
        </div>
      )}
    </LayOut>
  );
}

export default ProductDetail;
