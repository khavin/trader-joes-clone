import { useState } from "react";

import { useWindowDimensions } from "./hooks/windowDimension";
import { MobileMenu } from "./mobile_menu";
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
  desktopOrder: [
    ["Products"],
    ["Discover", "Recipes", "Listen", "Careers"],
    ["About Us", "Find A Store"],
  ],
};

export function Menu() {
  const { width } = useWindowDimensions();

  return <MobileMenu data={data} />;
}

function DesktopMenu() {}
