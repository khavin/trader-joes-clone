import menuIconURL from "./assets/menu-icon.svg";
import logoURL from "./assets/logo.svg";
import searchIconURL from "./assets/search-icon.svg";
import shoppingListIconURL from "./assets/shopping-list.svg";

import classes from "./header.module.css";
export function Header() {
  return (
    <header>
      {/* Menu and Logo group */}
      <div className={classes["header-groups"]}>
        <button aria-label="Menu" className={classes["menu-button"]}>
          <img src={menuIconURL}></img>
        </button>
        <h1>
          <a className={classes["main-logo"]} href="/">
            <img src={logoURL} alt="Trader Joe's Logo"></img>
          </a>
        </h1>
      </div>
      {/* Search and Shopping list group */}
      <div className={classes["header-groups"]}>
        <button
          className={classes["menu-button"] + " " + classes["search-button"]}
        >
          <img src={searchIconURL} alt="Search Icon"></img>
          <span className={classes["search-text"]}>Search</span>
        </button>
        <a href="/" className={classes["shopping-list"]}>
          <img
            className={classes["shopping-list-icon"]}
            src={shoppingListIconURL}
            alt="Shopping List Logo"
          ></img>
          <span className={classes["shopping-list-text"]}>Shopping List</span>
        </a>
      </div>
    </header>
  );
}
