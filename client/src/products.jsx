import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { useWindowDimensions } from "./hooks/windowDimension";
import { MOBILE_WIDTH } from "./constants";
import { BreadCrumb } from "./breadcrumb";
import classes from "./products.module.css";
import ProductURL from "./assets/products.webp";
import LeftNavSvgURL from "./assets/left_nav.svg";

export function Products() {
  // Mobile width
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(null);
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

  if (loading) return <div>Loading ...</div>;

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
        <nav className={classes["nav-list"]}>
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
