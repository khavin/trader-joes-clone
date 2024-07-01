import { useState } from "react";

import ProductsURL from "./assets/products.webp";
import DiscoverURL from "./assets/discover.webp";
import RecipesURL from "./assets/recipes.webp";
import ListenURL from "./assets/listen.webp";
import CareersURL from "./assets/careers.webp";
import LeftNavURL from "./assets/left_nav.svg";

import classes from "./mobile_menu.module.css";

export function MobileMenu({ data }) {
  // This state is used as a stack to push array indices.
  // The array indices belong to the children array in data.
  // The top value of the stack is the screen to render. If the
  // stack is empty, then display the main menu.
  const [state, setState] = useState([]);

  let itemsToDisplay = data;
  state.forEach((index) => {
    itemsToDisplay = itemsToDisplay["children"][index];
  });

  // Use this const to identify whether the user is in the first menu screen or not
  const isMainMenu = state.length === 0;

  const elements = itemsToDisplay["children"].map((item, index) => {
    return (
      <li
        className={isMainMenu ? classes["main-menu-item"] : ""}
        key={item.label}
        // Add onClick event listener if the nav item is a button
        onClick={
          item.children
            ? () => {
                // Add new index to the stack to move to the new screen
                const newState = [...state];
                newState.push(index);
                setState(newState);
              }
            : undefined
        }
      >
        {/* Render logos if there are any */}
        {item.image && (
          <img className={classes["menu-logo"]} src={item.image} />
        )}
        {/* There are two types of navigation: links and buttons */}
        {item.children ? (
          <button
            className={
              classes["menu-button"] +
              " " +
              (!isMainMenu && classes["individual-content-link"])
            }
          >
            {item.label}
            {!isMainMenu && (
              <img className={classes["right-nav-logo"]} src={LeftNavURL} />
            )}
          </button>
        ) : (
          <a
            className={
              classes["menu-link"] +
              " " +
              (!isMainMenu && classes["individual-content-link"])
            }
            href={item.href}
          >
            {item.label}
          </a>
        )}
      </li>
    );
  });

  return (
    <nav>
      {/* Previous screen navigation */}
      {itemsToDisplay.label && (
        <button
          className={classes["menu-button"] + " " + classes["previous-menu"]}
          onClick={() => {
            // Remove the top element of the stack to move to the previous screen
            const newState = [...state];
            newState.pop();
            setState(newState);
          }}
        >
          <img src={LeftNavURL} /> {itemsToDisplay.label}
        </button>
      )}
      {/* All content link */}
      {itemsToDisplay.href && (
        <a
          className={classes["menu-link"] + " " + classes["all-content-link"]}
          href={itemsToDisplay.href}
        >
          All {itemsToDisplay.label}
        </a>
      )}
      {/* Next screen navigation */}
      <ul className={classes["individual-content-links"]}>{elements}</ul>
    </nav>
  );
}
