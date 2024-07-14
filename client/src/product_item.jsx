import classes from "./product_item.module.css";
export function ProductItem({ category, itemName, price, perUnit, imgURL }) {
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
              classes["add-to-list-button"]
            }
          >
            + ADD TO LIST
          </button>
        </div>
      </div>
    </li>
  );
}
