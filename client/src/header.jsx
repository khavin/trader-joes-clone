import { useLocation, Link } from "wouter";
import menuIconURL from "./assets/menu_icon.svg";
import closeMenuIconURL from "./assets/close_menu.svg";
import logoURL from "./assets/logo.svg";
import searchIconURL from "./assets/search_icon.svg";
import shoppingListIconURL from "./assets/shopping_list.svg";

import classes from "./header.module.css";
export function Header({ showMenu, toggleShowMenu }) {
  const menuURL = !showMenu ? menuIconURL : closeMenuIconURL;
  const [location, setLocation] = useLocation();

  return (
    <header>
      {/* Menu and Logo group */}
      <div className={classes["header-groups"]}>
        <button
          aria-label="Menu"
          className={classes["header-button"] + " " + classes["menu-button"]}
        >
          <img
            src={menuURL}
            onClick={() => {
              toggleShowMenu(!showMenu);
            }}
          ></img>
        </button>
        <h1 className={classes["main-logo"]}>
          <button
            className={
              classes["header-button"] + " " + classes["main-logo-link"]
            }
            href="/"
            onClick={() => setLocation("/")}
          >
            <img src={logoURL} alt="Trader Joe's Logo"></img>
          </button>
        </h1>
      </div>
      {/* Search and Shopping list group */}
      <div className={classes["header-groups"]}>
        <button
          className={classes["header-button"] + " " + classes["search-button"]}
        >
          <img src={searchIconURL} alt="Search Icon"></img>
          <span className={classes["search-text"]}>Search</span>
        </button>
        <Link to="/home/shopping-list" className={classes["shopping-list"]}>
          <img
            className={classes["shopping-list-icon"]}
            src={shoppingListIconURL}
            alt="Shopping List Logo"
          ></img>
          <span className={classes["shopping-list-text"]}>Shopping List</span>
        </Link>
      </div>
    </header>
  );
}
