import { useContext } from "react";
import { useLocation } from "wouter";
import { ShoppingListContext } from "./contexts/ShoppingListContext";
import ContainerTop from "./assets/empty_container_top.webp";
import ContainerBottom from "./assets/empty_container_bottom.webp";
import classes from "./shopping_list.module.css";

export function ShoppingList() {
  const [location, setLocation] = useLocation();
  const [shoppingList, setShoppingList] = useContext(ShoppingListContext);

  // If the shopping list is empty
  if (Object.keys(shoppingList).length === 0) {
    return (
      <main className={classes["container"]}>
        <h2 className={classes["heading"]}>Shopping List</h2>
        <p className={classes["empty-content"]}>
          <img src={ContainerTop} className={classes["empty-container-img"]} />
          <span className={classes["start-shopping-message"]}>
            You have not added any items to your Shopping list. The great news
            is you can start it now!
          </span>
          <button
            className={"primary-button"}
            onClick={() => setLocation("/products")}
          >
            GO TO PRODUCTS
          </button>
          <img
            src={ContainerBottom}
            className={classes["empty-container-img"]}
          />
        </p>
      </main>
    );
  }

  return (
    <main className={classes["container"]}>
      <div>
        <div className={classes["heading"]}>
          <h2 className={classes["title"]}>Shopping List</h2>
          <button className={classes["clear-all-button"]}>Clear all</button>
        </div>
        <ul className={classes["list"]}>
          {Object.keys(shoppingList).map((item) => {
            return (
              <li key={item} className={classes["list-item"]}>
                <picture className={classes["img-container"]}>
                  <img
                    className={classes["product-item-img"]}
                    src={shoppingList[item].imgURL}
                  />
                </picture>
                <p className={classes["item-info"]}>
                  <span className={classes["item-name"]}>{item}</span>
                  <span className={classes["item-weight"]}>
                    {shoppingList[item].perUnit}
                  </span>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      <aside></aside>
    </main>
  );
}
