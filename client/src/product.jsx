import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import classes from "./product.module.css";

export function Product() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(null);
  // The selected categories include both the top level selected category and
  // the selected sub category.
  const params = useParams();

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

  // This function can be called recursively to identify the selected category and its parent categories
  function searchSubCategories(subCategories) {
    if (subCategories.length === 0) return false;

    for (let i = 0; i < subCategories.length; i++) {
      if (subCategories[i].name === params.category) {
        // Path param category matched
        selectedCategories.push(subCategories[i].name);
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

  return (
    <section className={classes["products-section"]}>
      <aside>
        <ProductNav
          categories={categories}
          selectedCategories={selectedCategories}
          // Default level of categories. For sub categories level will be incremented by one.
          level={0}
        />
      </aside>
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
