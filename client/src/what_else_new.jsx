import { useId, useState, useEffect } from "react";
import { SectionHeader } from "./section_header";
import { Loader } from "./loader";
import { ProductItem } from "./product_item";
import { ScrollableNavigation } from "./scrollable_navigation";
import classes from "./what_else_new.module.css";

const title = "So, What Else is New?";
// Only applicable in desktop view
const productsPerSlide = 3;
export function WhatElseNew() {
  const componentId = useId();
  const idString = "-item-";

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const response = await fetch("./test_what_else_new_items.json");
      const responseJSON = await response.json();

      setProducts(responseJSON["data"]);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    <>
      <SectionHeader title={title} />
      <Loader />
    </>;
  }

  const pages = [];
  for (let i = 0; i < products.length / productsPerSlide; i++) {
    const pageContent = [];
    for (let j = 0; j < productsPerSlide; j++) {
      const product = products[i * productsPerSlide + j];
      pageContent.push(
        <ProductItem
          key={product.name}
          itemName={product.name}
          category={product.category}
          price={product.price}
          perUnit={product.perUnit}
          imgURL={product.imgURL}
        />
      );
    }
    pages.push(
      <ul key={i} id={componentId + idString + i} className={classes["page"]}>
        {pageContent}
      </ul>
    );
  }

  return (
    <section className={classes["container"]}>
      <SectionHeader title={title} />
      <div className={classes["scroll-container"]}>{pages}</div>
      <ScrollableNavigation
        page={page}
        setPage={setPage}
        componentId={componentId}
        totalLength={products.length / productsPerSlide}
        idString={idString}
      />
    </section>
  );
}
