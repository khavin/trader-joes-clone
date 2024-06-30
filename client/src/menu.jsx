import { useState } from "react";

import { useWindowDimensions } from "./hooks/windowDimension";

import ProductsURL from "./assets/products.webp";
import DiscoverURL from "./assets/discover.webp";
import RecipesURL from "./assets/recipes.webp";
import ListenURL from "./assets/listen.webp";
import CareersURL from "./assets/careers.webp";
import LeftNavURL from "./assets/left_nav.svg";

import classes from "./menu.module.css";

const MOBILE_WIDTH = 750;
// This should be replaced with data from backend
const data = {
  children: [
    {
      href: "/home/products",
      label: "Products",
      linkLevel: 1,
      children: [
        {
          href: "/home/products/category?filters=%7B%22areNewProducts%22%3Atrue%7D",
          label: "What's New",
          linkLevel: 2,
        },
        {
          href: "/home/products/category/food-8",
          label: "Food",
          linkLevel: 2,
          children: [
            {
              href: "/home/products/category/bakery-11",
              label: "Bakery",
              linkLevel: 3,
            },
            {
              href: "/home/products/category/cheese-29",
              label: "Cheese",
              linkLevel: 3,
            },
            {
              href: "/home/products/category/dairy-and-eggs-44",
              label: "Dairy & Eggs",
              linkLevel: 3,
            },
            {
              href: "/home/products/category/dips-sauces-and-dressings-59",
              label: "Dips, Sauces & Dressings",
              linkLevel: 3,
            },
            {
              href: "/home/products/category/fresh-prepared-foods-80",
              label: "Fresh Prepared Foods",
              linkLevel: 3,
            },
            {
              href: "/home/products/category/from-the-freezer-95",
              label: "From the Freezer",
              linkLevel: 3,
            },
            {
              href: "/home/products/category/fresh-fruits-and-veggies-113",
              label: "Fresh Fruits & Veggies",
              linkLevel: 3,
            },
            {
              href: "/home/products/category/meat-seafood-and-plant-based-122",
              label: "Meat, Seafood & Plant-based",
              linkLevel: 3,
            },
            {
              href: "/home/products/category/for-the-pantry-137",
              label: "For the Pantry",
              linkLevel: 3,
            },
            {
              href: "/home/products/category/snacks-and-sweets-167",
              label: "Snacks & Sweets",
              linkLevel: 3,
            },
          ],
        },
        {
          href: "/home/products/category/beverages-182",
          label: "Beverages",
          linkLevel: 2,
        },
        {
          href: "/home/products/category/flowers-and-plants-203",
          label: "Flower & Plants",
          linkLevel: 2,
        },
        {
          href: "/home/products/category/everything-else-215",
          label: "Everything Else",
          linkLevel: 2,
        },
      ],
      image: ProductsURL,
    },
    {
      href: "/home/discover",
      label: "Discover",
      linkLevel: 1,
      children: [
        {
          href: "/home/discover/entertaining",
          label: "Entertaining",
          linkLevel: 3,
        },
        {
          href: "/home/discover/guides",
          label: "Guides",
          linkLevel: 3,
        },
        {
          href: "/home/discover/stories",
          label: "Stories",
          linkLevel: 3,
        },
        {
          href: "/home/subscribe",
          label: "Subscribe",
          linkLevel: 3,
        },
      ],
      image: DiscoverURL,
    },
    {
      href: "/home/recipes",
      label: "Recipes",
      linkLevel: 1,
      children: [
        {
          href: "/home/recipes?categories=appetizer&page=1",
          label: "Appetizers & Sides",
          linkLevel: 3,
        },
        {
          href: "/home/recipes?categories=beverages",
          label: "Beverages",
          linkLevel: 3,
        },
        {
          href: "/home/recipes?categories=breakfast&page=1",
          label: "Breakfast",
          linkLevel: 3,
        },
        {
          href: "/home/recipes?page=1&categories=lunch",
          label: "Lunch",
          linkLevel: 3,
        },
        {
          href: "/home/recipes?page=1&categories=dinner",
          label: "Dinner",
          linkLevel: 3,
        },
        {
          href: "/home/recipes?page=1&categories=desserts",
          label: "Desserts",
          linkLevel: 3,
        },
      ],
      image: RecipesURL,
    },
    {
      href: "/home/podcast",
      label: "Listen",
      linkLevel: 1,
      image: ListenURL,
    },
    {
      href: "/home/careers",
      label: "Careers",
      linkLevel: 1,
      image: CareersURL,
    },
    {
      href: "/home/about-us",
      label: "About Us",
      linkLevel: 1,
      children: [
        {
          href: "/home/neighborhood-shares",
          label: "Neighborhood Shares",
          linkLevel: 3,
        },
        {
          href: "/home/announcements",
          label: "Announcements",
          linkLevel: 3,
        },
        {
          href: "/home/careers",
          label: "Careers",
          linkLevel: 3,
        },
        {
          href: "/home/contact-us",
          label: "Contact Us",
          linkLevel: 3,
        },
      ],
      image: null,
    },
    {
      href: "/home/store-search",
      label: "Find A Store",
      linkLevel: 1,
      image: null,
    },
  ],
};

export function Menu() {
  const { width } = useWindowDimensions();

  return <MobileMenu />;
}

function MobileMenu() {
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

function DesktopMenu() {}
