import { useEffect, useState } from "react";

import classes from "./product.module.css";

export function Product() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(null);
  // The selected categories include both the top level selected category and
  // the selected sub category.
  const [selectedCategories, setSelectedCategories] = useState([]);

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
  return (
    <div>
      <ProductNav
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        // Default level of categories. For sub categories level will be incremented by one.
        level={0}
      />
    </div>
  );
}

function ProductNav({
  categories,
  selectedCategories,
  setSelectedCategories,
  level,
}) {
  const categoryList = categories.map((category) => {
    // Search if the category is selected or not using indexOf function.
    const indexInSelected = selectedCategories.indexOf(category.name);
    let applicableClasses = "";

    if (indexInSelected != -1) {
      // Make the category string bold if it is selected.
      applicableClasses += classes["selectedCategory"];
      if (indexInSelected === selectedCategories.length - 1) {
        // Make the category active if it is the last one selected.
        applicableClasses += " " + classes["activeCategory"];
      }
    }

    return (
      <li key={category.name}>
        <span
          onClick={() => {
            let updatedSelectedCategories = [...selectedCategories];

            // Check if there are any other categories selected in the same level or has level more than
            // the current category. If selected pop them recurisively until we reach one level lesser
            // than the current level.
            while (updatedSelectedCategories.length > level) {
              updatedSelectedCategories.pop();
            }

            // Add category name to selected categories list
            updatedSelectedCategories = [
              ...updatedSelectedCategories,
              category.name,
            ];
            setSelectedCategories(updatedSelectedCategories);
          }}
          className={applicableClasses}
        >
          {category.name}
        </span>
        {/* If the selected category has sub categories, display them recursively by using ProductNav component */}
        {selectedCategories.includes(category.name) &&
          category.subCategories.length > 0 && (
            <ProductNav
              categories={category.subCategories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              // Increment level by one for sub categories
              level={level + 1}
            />
          )}
      </li>
    );
  });

  return (
    <nav>
      <ul>{categoryList}</ul>
    </nav>
  );
}
