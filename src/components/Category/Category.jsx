import React from "react";
import { CategoryInfos } from "./CategoryFullInfo";
import CategoryCard from "./CategoryCard";
import styles from "./category.module.css";
function Category() {
  // console.log(CategoryInfos);
  return (
    <section className={styles.category_container}>
      {CategoryInfos.map((info, index) => {
        return <CategoryCard data={info} key={index} />;
      })}
    </section>
  );
}

export default Category;
