import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";

import { useWindowDimensions } from "./hooks/windowDimension";
import { MOBILE_WIDTH } from "./constants";

import { BreadCrumb } from "./breadcrumb";
import { ProductItem } from "./product_item";
import Loader from "./loader";

import classes from "./products.module.css";

import ProductURL from "./assets/products.webp";
import LeftNavSvgURL from "./assets/left_nav.svg";
import ArrowSvgURL from "./assets/arrow.svg";

export function Products() {
  // Mobile width
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(true);
  const [itemsloading, setItemsLoading] = useState(true);
  const [categories, setCategories] = useState(null);
  const [productItems, setProductItems] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  // The selected categories include both the top level selected category and
  // the selected sub category.
  let params = useParams();
  const [location, navigate] = useLocation();

  // Path Params will not update if the path has no params.
  // Seems like a bug in wouter.
  if (location.indexOf("categories") === -1) params = "";
  const selectedCategory = params === "" ? "Products" : params.category;

  // Fetch product categories and respective filters
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch("/products.json");
      const data = await response.json();

      setCategories(data);
      setLoading(false);
    }

    fetchData();
  }, []);

  // Fetch product items
  useEffect(() => {
    async function fetchData() {
      setItemsLoading(true);
      const response = await fetch("/test_product_items.json");
      const responseJSON = await response.json();

      const updatedProductItems = structuredClone(productItems);
      if (!(selectedCategory in updatedProductItems)) {
        updatedProductItems[selectedCategory] = {};
      }
      updatedProductItems[selectedCategory][pageNumber] = responseJSON["data"];
      setProductItems(updatedProductItems);
      setTotalItems(responseJSON["length"]);
      setItemsLoading(false);
      console.log(updatedProductItems);
    }

    // Only fetch the data if the page data or the selected category
    // is not available in memory.
    if (
      !(selectedCategory in productItems) ||
      !(pageNumber in productItems[selectedCategory])
    ) {
      fetchData();
    }
  }, [selectedCategory, pageNumber]);

  if (loading) return <Loader />;

  // Use the path param to identify the selected categories
  const selectedCategories = [];

  // The sub categories to show if we are showing the select element as the products nav.
  // By default show top level categories
  let finalSubCategories = categories;

  // This function can be called recursively to identify the selected category and its parent categories
  function searchSubCategories(subCategories) {
    if (subCategories.length === 0) return false;

    for (let i = 0; i < subCategories.length; i++) {
      if (subCategories[i].name === selectedCategory) {
        // Path param category matched
        selectedCategories.push(subCategories[i].name);
        // Keep track of the selected category's sub categories.
        // This will be showed in the select products nav.
        finalSubCategories = subCategories[i].subCategories;
        return true;
      }

      if (searchSubCategories(subCategories[i].subCategories)) {
        // One of the sub categories has matching path param category
        selectedCategories.push(subCategories[i].name);
        return true;
      }
    }

    return false;
  }
  searchSubCategories(categories);

  const breadCrumbPaths = selectedCategories.map((category) => {
    return {
      name: category,
      url: `/products/categories/${category}`,
    };
  });

  breadCrumbPaths.push({
    name: "Products",
    url: `/products`,
  });
  breadCrumbPaths.push({
    name: "Home",
    url: `/`,
  });

  return (
    <section className={classes["products-section"]}>
      <BreadCrumb paths={breadCrumbPaths.reverse()} />
      <FeaturedProducts />
      <div className={classes["nav-and-content-container"]}>
        {width <= MOBILE_WIDTH ? (
          finalSubCategories.length > 0 && (
            <ProductNavAsSelect
              category={selectedCategory}
              subCategories={finalSubCategories}
            />
          )
        ) : (
          <aside>
            <ProductNav
              categories={categories}
              selectedCategories={selectedCategories}
              // Default level of categories. For sub categories level will be incremented by one.
              level={0}
            />
          </aside>
        )}
        <main>
          <h2>{selectedCategory}</h2>
          {/* TODO - Two conditions are used to check if the items are loading or not. Fix it. */}
          {itemsloading ||
          !(selectedCategory in productItems) ||
          !(pageNumber in productItems[selectedCategory]) ? (
            <Loader />
          ) : (
            <>
              <ul className={classes["product-list"]}>
                {productItems[selectedCategory][pageNumber].map((item) => (
                  <ProductItem
                    key={item.name}
                    itemName={item.name}
                    category={item.category}
                    price={item.price}
                    perUnit={item.perUnit}
                    imgURL={item.imgURL}
                  />
                ))}
              </ul>
              <Pagination
                pages={totalItems}
                setPageNumber={setPageNumber}
                pageNumber={pageNumber}
              />
            </>
          )}
        </main>
      </div>
    </section>
  );
}

function ProductNav({ categories, selectedCategories, level }) {
  const [_, navigate] = useLocation();
  const categoryList = categories.map((category) => {
    // Search if the category is selected or not using indexOf function.
    const indexInSelected = selectedCategories.indexOf(category.name);
    let applicableClasses = classes["product-category"];

    if (level == 0) applicableClasses += " " + classes["top-category"];
    if (level > 0) applicableClasses += " " + classes["sub-category"];

    if (indexInSelected != -1) {
      // Make the category string bold if the category is a parent of the selected category.
      applicableClasses += " " + classes["selected-category"];
      if (indexInSelected === 0) {
        // Make the category active if it is the selected category.
        applicableClasses += " " + classes["active-category"];
      }
    }

    return (
      <li key={category.name}>
        <button
          onClick={() => {
            navigate("/products/categories/" + category.name);
          }}
          className={applicableClasses}
        >
          {category.name}
        </button>
        {/* If the selected category has sub categories, display them recursively by using ProductNav component */}
        {selectedCategories.includes(category.name) &&
          category.subCategories.length > 0 && (
            <ProductNav
              categories={category.subCategories}
              selectedCategories={selectedCategories}
              // Increment level by one for sub categories
              level={level + 1}
            />
          )}
      </li>
    );
  });

  return (
    <nav>
      <ul className={classes["nav-list"]}>{categoryList}</ul>
    </nav>
  );
}

function ProductNavAsSelect({ category, subCategories }) {
  const [_, navigate] = useLocation();
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <div className={classes["product-nav-select"]}>
      <button
        className={classes["nav-toggle-button"]}
        aria-expanded={menuVisible}
        aria-controls="product-categories-navigation"
        onClick={() => {
          setMenuVisible(!menuVisible);
        }}
      >
        {"All " + category}
        <img
          className={menuVisible ? classes["close-menu"] : classes["open-menu"]}
          src={LeftNavSvgURL}
        ></img>
      </button>
      {menuVisible && (
        <nav id="product-categories-navigation" className={classes["nav-list"]}>
          {subCategories.map((subCategory) => (
            <button
              className={classes["product-category"]}
              onClick={() => {
                setMenuVisible(false);
                navigate("/products/categories/" + subCategory.name);
              }}
              key={subCategory.name}
            >
              {subCategory.name}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}

function FeaturedProducts() {
  const content =
    "These are some of the greatest products to arrive on our shelves. We'll be continuing to add product hall-of-famers to this list; keep checking back for updates";

  const title = "Featured Products";

  return (
    <section className={classes["featured-products-container"]}>
      <div>
        <img
          className={classes["featured-products-img"]}
          src={ProductURL}
        ></img>
      </div>
      <div>
        <h3 className={classes["featured-products-title"]}>{title}</h3>
        <p className={classes["featured-products-content"]}>{content}</p>
      </div>
    </section>
  );
}

function Pagination({ pages, pageNumber, setPageNumber }) {
  const adjacentPageButtons = [];

  // If possible we want to show three page links before the current page
  // and three page links after the current page
  let start = Math.max(2, pageNumber - 3);
  let end = Math.min(pages - 1, pageNumber + 3);

  if (end - start + 1 < 7) {
    if (end - pageNumber < 3) {
      // In this case, we can't show three page links after the current page
      // So here we can try to show more than 3 page links before the current page
      const excess = 2 - (end - pageNumber);
      start = Math.max(2, pageNumber - (3 + excess));
    } else {
      // In this case, we can't show three page links before the current page
      // So here we can try to show more than 3 page links after the current page
      const excess = 2 - (pageNumber - start);
      end = Math.min(pages - 1, pageNumber + 3 + excess);
    }
  }

  // Function to return the pagination button element
  function getButton(currentPage) {
    return (
      <button
        key={currentPage}
        className={
          classes["pagination-button"] +
          " " +
          (currentPage == pageNumber && classes["active-page"])
        }
        onClick={() => setPageNumber(currentPage)}
      >
        {currentPage}
      </button>
    );
  }

  // Always show the first page button
  adjacentPageButtons.push(getButton(1));

  // Show ellipsis if we are not showing buttons sequentially from start
  if (start - 1 > 1) {
    adjacentPageButtons.push(<span key={-1}>...</span>);
  }

  for (let i = start; i <= end; i++) {
    adjacentPageButtons.push(getButton(i));
  }

  // Show ellipsis if we are not showing buttons sequentially from end
  if (end + 1 < pages) {
    adjacentPageButtons.push(<span key={-2}>...</span>);
  }

  // Always show the last page button
  adjacentPageButtons.push(getButton(pages));

  return (
    <nav className={classes["pagination"]}>
      {/* Left arrow to move one page left */}
      <button
        disabled={pageNumber === 1}
        className={classes["pagination-button"] + " " + classes["arrow"]}
        onClick={() => {
          setPageNumber(pageNumber - 1);
        }}
      >
        <img src={ArrowSvgURL} />
      </button>

      {adjacentPageButtons}

      {/* Right arrow to move one page right */}
      <button
        disabled={pageNumber === pages}
        className={classes["pagination-button"] + " " + classes["arrow"]}
        onClick={() => {
          setPageNumber(pageNumber + 1);
        }}
      >
        <img className={classes["right-arrow"]} src={ArrowSvgURL} />
      </button>
    </nav>
  );
}
