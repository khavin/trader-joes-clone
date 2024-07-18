import { useContext } from "react";
import { useLocation } from "wouter";
import { ShoppingListContext } from "./contexts/ShoppingListContext";
import ContainerTop from "./assets/empty_container_top.webp";
import ContainerBottom from "./assets/empty_container_bottom.webp";
import ProductsURL from "./assets/products.webp";
import PlusURL from "./assets/plus.svg";
import MinusURL from "./assets/minus.svg";
import DustBinURL from "./assets/dustbin.svg";
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

  function incrementQuantity(item) {
    const clone = structuredClone(shoppingList);
    clone[item].quantity++;
    setShoppingList(clone);
  }

  function decrementQuantity(item) {
    const clone = structuredClone(shoppingList);
    if (clone[item].quantity === 1) {
      delete clone[item];
    } else {
      clone[item].quantity--;
    }

    setShoppingList(clone);
  }

  function deleteItem(item) {
    const clone = structuredClone(shoppingList);
    if (item in clone) {
      delete clone[item];
    }
    setShoppingList(clone);
  }

  function clearAll() {
    setShoppingList({});
  }

  return (
    <main
      className={
        classes["container"] + " " + classes["container-with-shopping-items"]
      }
    >
      <div>
        <div className={classes["heading"]}>
          <h2 className={classes["title"]}>Shopping List</h2>
          <button onClick={clearAll} className={classes["clear-all-button"]}>
            Clear all
          </button>
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
                <div className={classes["info-and-action-buttons-container"]}>
                  <p className={classes["item-info"]}>
                    <span className={classes["item-name"]}>{item}</span>
                    <span className={classes["item-weight"]}>
                      {shoppingList[item].perUnit}
                    </span>
                  </p>
                  <p className={classes["action-buttons"]}>
                    <span className={classes["quantity-action-buttons"]}>
                      <button
                        onClick={() => decrementQuantity(item)}
                        className={classes["action-button"]}
                      >
                        <img src={MinusURL} />
                      </button>
                      <span className={classes["quantity-number"]}>
                        {shoppingList[item].quantity}
                      </span>
                      <button
                        onClick={() => incrementQuantity(item)}
                        className={classes["action-button"]}
                      >
                        <img src={PlusURL} />
                      </button>
                    </span>

                    <button
                      onClick={() => deleteItem(item)}
                      className={classes["action-button"]}
                    >
                      <img src={DustBinURL} />
                    </button>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <aside>
        <article className={classes["about-list-container"]}>
          <img className={classes["products-logo"]} src={ProductsURL} />
          <h3>This shopping list is just a list</h3>
          <p className={classes["about-list-text"]}>
            We do not sell any products online. We set up our stores with care,
            filling them with knowledgeable, welcoming Crew Members and a sense
            of adventure.
          </p>
        </article>
      </aside>
    </main>
  );
}
