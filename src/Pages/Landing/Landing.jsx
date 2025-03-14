import React from "react";
import LayOut from "../../components/LayOut/LayOut";
import Carousels from "../../components/Carousel/CarouselEffect";
import Category from "../../components/Category/Category";
import Product from "../../components/Product/Product";
export default function Landing() {
  return (
    <>
      <LayOut>
        <Carousels />
        <Category />
        <Product />
      </LayOut>
    </>
  );
}
