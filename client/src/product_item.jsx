import { useContext } from "react";
import { ShoppingListContext } from "./contexts/ShoppingListContext";
import TickURL from "./assets/red_tick.svg";
import PlusURL from "./assets/red_plus.svg";
import classes from "./product_item.module.css";

export function ProductItem({ category, itemName, price, perUnit, imgURL }) {
  const [shoppingList, setShoppingList] = useContext(ShoppingListContext);
  let displayText = "ADD TO LIST";
  if (itemName in shoppingList) {
    displayText = "ADDED TO LIST";
  }

  function handleClick() {
    const clone = structuredClone(shoppingList);
    if (!(itemName in clone)) {
      clone[itemName] = {
        price: price,
        category: category,
        perUnit: perUnit,
        imgURL: imgURL,
        quantity: 1,
      };
      setShoppingList(clone);
    }
  }

  return (
    <li className={classes["product-item-container"]}>
      <picture className={classes["product-img-container"]}>
        <img className={classes["product-img"]} src={imgURL} />
      </picture>
      <div className={classes["product-text-info"]}>
        <div>
          <p className={classes["category-text"]}>{category}</p>
          <h4 className={classes["product-item"]}>{itemName}</h4>
        </div>

        <div>
          <p className={classes["product-price"]}>
            <strong>${price}</strong>/
            <span className={classes["per-unit"]}>{perUnit}</span>
          </p>
          <button
            className={
              "primary-button" +
              " " +
              classes["cart-button"] +
              " " +
              classes["add-to-list-button"] +
              " " +
              (itemName in shoppingList && classes["cart-added-item"])
            }
            onClick={handleClick}
          >
            {itemName in shoppingList ? (
              <img src={TickURL} />
            ) : (
              <img src={PlusURL} />
            )}
            {displayText}
          </button>
        </div>
      </div>
    </li>
  );
}
